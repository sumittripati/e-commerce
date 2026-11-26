import * as orderRepository from "../repositories/order.repository";
import pool from "../../config/db";
import { AppError } from "../../utils/AppError";
import { toPaise, fromPaise } from "../../utils/money";
import { CreateOrderInput, ProductRow } from "../types/order.type";

export async function getOrderByIdService(id: string | null) {

    const rows = await orderRepository.getOrderByIdRepo(id);

    if (rows.length === 0) {
        return undefined;
    }

    const first = rows[0];
    console.log("first ", first)

    return {
        orderId: first.order_id,

        customer: {
            name: first.customer_name,
            email: first.customer_email
        },

        status: first.status,
        totalAmount: first.total_amount,

        items: rows
            .filter((row) => row.product_id !== null)
            .map((row) => ({
                productId: row.product_id,
                productName: row.product_name,
                quantity: row.quantity,
                unitPrice: row.unit_price
            }))
    };
}


export async function createOrderService(
    data: CreateOrderInput
) {

    const client = await pool.connect();

    let discardClient = false;

    try {

        // 1. Start transaction

        await client.query("BEGIN");


        // 2. Verify user

        const user = await orderRepository.findUserRepo(
            client,
            data.userId
        );

        if (!user) {
            throw new AppError("User not found", 404);
        }


        // 3. Sort products to reduce deadlock risk

        const sortedItems = [...data.items].sort((a, b) => {

            const left = BigInt(a.productId);
            const right = BigInt(b.productId);

            if (left < right) return -1;

            if (left > right) return 1;

            return 0;
        });


        // 4. Temporary variables

        const selectedProducts: {
            product: ProductRow;
            quantity: number;
        }[] = [];

        let totalPaise = 0n;


        // 5. Retrieve products, lock and check stock

        for (const item of sortedItems) {

            const product =
                await orderRepository.lockProductRepo(
                    client,
                    item.productId
                );

            if (!product) {
                throw new AppError(
                    `Product ${item.productId} not found`,
                    404
                );
            }

            if (product.stock < item.quantity) {
                throw new AppError(
                    `Insufficient stock for ${product.name}`,
                    409
                );
            }

            totalPaise +=
                toPaise(product.price) * BigInt(item.quantity);

            selectedProducts.push({
                product,
                quantity: item.quantity
            });
        }


        // 6. Calculate total amount

        if (totalPaise > 999999999999n) {
            throw new AppError(
                "Order total exceeds supported limit",
                400
            );
        }

        const totalAmount = fromPaise(totalPaise);


        // 7. Create order

        const order =
            await orderRepository.createOrderRepo(
                client,
                data.userId,
                totalAmount
            );


        // 8. Create order items and deduct stock

        for (const entry of selectedProducts) {

            await orderRepository.createOrderItemRepo(
                client,
                order.id,
                entry.product.id,
                entry.quantity,
                entry.product.price
            );

            const updatedRows =
                await orderRepository.deductStockRepo(
                    client,
                    entry.product.id,
                    entry.quantity
                );

            if (updatedRows !== 1) {
                throw new AppError(
                    "Stock update failed",
                    409
                );
            }
        }


        // 9. Prepare response

        const response = {
            orderId: order.id,
            userId: order.user_id,
            status: order.status,
            totalAmount: order.total_amount,

            items: selectedProducts.map((entry) => ({
                productId: entry.product.id,
                productName: entry.product.name,
                quantity: entry.quantity,
                unitPrice: entry.product.price
            }))
        };


        // 10. Commit transaction

        await client.query("COMMIT");

        return response;

    } catch (error) {

        // 11. Rollback transaction

        try {
            await client.query("ROLLBACK");
        } catch (rollbackError) {
            discardClient = true;
            console.error("Rollback failed:", rollbackError);
        }

        throw error;

    } finally {

        // 12. Release database connection

        client.release(discardClient);

    }
}