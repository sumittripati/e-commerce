import { Request, Response } from "express";
import * as userService from "../services/user.service";

// POST - Create user
export const createUserController = async (
    req: Request,
    res: Response
) => {
    try {
        const data = req.body;

        const user = await userService.createUserService(data);

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: user
        });

    } catch (error) {
        console.error(error);

        // PostgreSQL unique constraint violation
        if (
            typeof error === "object" &&
            error !== null &&
            "code" in error &&
            error.code === "23505"
        ) {
            return res.status(409).json({
                success: false,
                message: "Email already exists"
            });
        }

        return res.status(500).json({
            success: false,
            message: "Failed to create user"
        });
    }
};

// GET - Get all users
export const getUserController = async (
    req: Request,
    res: Response
) => {
    try {
        const users = await userService.getUserService();

        return res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: users
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch users"
        });
    }
};