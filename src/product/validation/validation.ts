// Check whether value is an object
export function isObject(value: unknown): boolean {
    if (typeof value !== "object") {
        return false;
    }

    if (value === null || Array.isArray(value)) {
        return false;
    }

    return true;
}


// Validate ID
export function parseId(value: unknown): string | null {
    if (typeof value !== "string") {
        return null;
    }

    const id = Number(value);

    if (!Number.isSafeInteger(id) || id <= 0) {
        return null;
    }

    return String(id);
}


// Validate price
export function isValidPrice(value: unknown): boolean {
    if (typeof value !== "number") {
        return false;
    }

    if (!Number.isFinite(value) || value < 0) {
        return false;
    }

    return true;
}


// Validate stock
export function isValidStock(value: unknown): boolean {
    if (typeof value !== "number") {
        return false;
    }

    if (!Number.isInteger(value) || value < 0) {
        return false;
    }

    return true;
}


import { Request, Response, NextFunction } from "express";
export function validateCreateProduct(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { name, price, stock } = req.body ?? {};

    if (typeof name !== "string" || name.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Valid product name is required"
        });
    }

    if (typeof price !== "number" || !Number.isFinite(price) || price <= 0) {
        return res.status(400).json({
            success: false,
            message: "Price must be greater than zero"
        });
    }

    if (!Number.isInteger(stock) || stock < 0) {
        return res.status(400).json({
            success: false,
            message: "Stock must be a non-negative integer"
        });
    }

    next();
}