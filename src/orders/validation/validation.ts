import { Request, Response, NextFunction } from "express";
import { AppError } from "../../utils/AppError";

export function validateCreateOrder(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {

        // 1. Check request body
        if (
            !req.body ||
            typeof req.body !== "object" ||
            Array.isArray(req.body)
        ) {
            throw new AppError("Invalid request body", 400);
        }

        const { userId, items } = req.body;

        // 2. Reject extra fields
        if (
            Object.keys(req.body).some(
                key => !["userId", "items"].includes(key)
            )
        ) {
            throw new AppError("Invalid request fields", 400);
        }

        // 3. Validate user ID
        if (
            typeof userId !== "string" ||
            !/^[1-9]\d*$/.test(userId) ||
            BigInt(userId) > 9223372036854775807n
        ) {
            throw new AppError("Invalid user ID", 400);
        }

        // 4. Validate items array
        if (!Array.isArray(items) || items.length === 0) {
            throw new AppError(
                "At least one product is required",
                400
            );
        }

        // 5. Maximum products limit
        if (items.length > 50) {
            throw new AppError(
                "Maximum 50 products allowed",
                400
            );
        }

        // 6. Set for duplicate products
        const productIds = new Set<string>();

        // 7. Validate each item
        for (const item of items) {

            if (
                !item ||
                typeof item !== "object" ||
                Array.isArray(item)
            ) {
                throw new AppError("Invalid order item", 400);
            }

            // Reject extra item fields
            if (
                Object.keys(item).some(
                    key => !["productId", "quantity"].includes(key)
                )
            ) {
                throw new AppError("Invalid item fields", 400);
            }

            // Validate product ID
            if (
                typeof item.productId !== "string" ||
                !/^[1-9]\d*$/.test(item.productId) ||
                BigInt(item.productId) > 9223372036854775807n
            ) {
                throw new AppError("Invalid product ID", 400);
            }

            // Validate quantity
            if (
                !Number.isInteger(item.quantity) ||
                item.quantity <= 0 ||
                item.quantity > 2147483647
            ) {
                throw new AppError("Invalid quantity", 400);
            }

            // Check duplicate product
            if (productIds.has(item.productId)) {
                throw new AppError(
                    "Duplicate product not allowed",
                    400
                );
            }

            productIds.add(item.productId);
        }

        // 8. All validations passed
        next();

    } catch (error) {

        next(error);

    }
}