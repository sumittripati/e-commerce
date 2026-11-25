import { Request, Response, NextFunction } from "express";

export function validateCreateUser(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { name, email } = req.body ?? {};

    // Name validation
    if (
        typeof name !== "string" ||
        name.trim() === "" ||
        name.length > 100
    ) {
        return res.status(400).json({
            success: false,
            message: "Valid name is required"
        });
    }

    // Email validation
    if (
        typeof email !== "string" ||
        email.length > 255 ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
        return res.status(400).json({
            success: false,
            message: "Valid email is required"
        });
    }

    next();
}