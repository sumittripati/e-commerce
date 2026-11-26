import pool from "../../config/db";
import { CreatedOrderRow, OrderRow, ProductRow } from "../types/order.type";
import type { PoolClient } from "pg";

export async function getOrderByIdRepo(
    id: string | null
): Promise<OrderRow[]> {

    const result = await pool.query<OrderRow>(
        `SELECT
            o.id AS order_id,
            o.status,
            o.total_amount,
            u.name AS customer_name,
            u.email AS customer_email,
            p.id AS product_id,
            p.name AS product_name,
            oi.quantity,
            oi.unit_price

         FROM orders o

         JOIN users u
         ON u.id = o.user_id

         LEFT JOIN order_items oi
         ON oi.order_id = o.id

         LEFT JOIN products p
         ON p.id = oi.product_id

         WHERE o.id = $1

         ORDER BY oi.id`,
        [id]
    );

    return result.rows;
}

// 1. Find user

export async function findUserRepo(
    client: PoolClient,
    userId: string
) {
    const result = await client.query(
        "SELECT id FROM users WHERE id = $1",
        [userId]
    );

    return result.rows[0];
}


// 2. Retrieve and lock product

export async function lockProductRepo(
    client: PoolClient,
    productId: string
): Promise<ProductRow | undefined> {

    const result = await client.query<ProductRow>(
        `SELECT id, name, price, stock
         FROM products
         WHERE id = $1
         FOR UPDATE`,
        [productId]
    );

    return result.rows[0];
}


// 3. Create order

export async function createOrderRepo(
    client: PoolClient,
    userId: string,
    totalAmount: string
): Promise<CreatedOrderRow> {

    const result = await client.query<CreatedOrderRow>(
        `INSERT INTO orders (
            user_id,
            status,
            total_amount
        )
        VALUES ($1, 'PENDING', $2)
        RETURNING id, user_id, status, total_amount`,
        [userId, totalAmount]
    );

    return result.rows[0];
}


// 4. Create order item

export async function createOrderItemRepo(
    client: PoolClient,
    orderId: string,
    productId: string,
    quantity: number,
    unitPrice: string
): Promise<void> {

    await client.query(
        `INSERT INTO order_items (
            order_id,
            product_id,
            quantity,
            unit_price
        )
        VALUES ($1, $2, $3, $4)`,
        [orderId, productId, quantity, unitPrice]
    );
}


// 5. Deduct stock

export async function deductStockRepo(
    client: PoolClient,
    productId: string,
    quantity: number
): Promise<number> {

    const result = await client.query(
        `UPDATE products
         SET stock = stock - $1
         WHERE id = $2
         AND stock >= $1`,
        [quantity, productId]
    );

    return result.rowCount ?? 0;
}