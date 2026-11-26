import { Request, Response, NextFunction } from "express";
import * as orderService from "../services/order.service";
import { parseId } from "../../product/validation/validation";
import { AppError } from "../../utils/AppError";
import { CreateOrderInput } from "../types/order.type";

const getOrderByIdController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: string | null = parseId(req.params.id);

        const order = await orderService.getOrderByIdService(id);

        if (!order) {
            throw new AppError("Order not found", 404);
        }

        return res.status(200).json({
            success: true,
            message: "Order fetched successfully",
            data: order
        });

    } catch (error) {
        console.error(error);
        next(error);
    }
};

async function createOrderController(req: Request, res: Response, next: NextFunction) {
    try {

        const data: CreateOrderInput = req.body;

        const order = await orderService.createOrderService(data);

        return res.status(201).json({
            success: true,
            message: "Order created successfully",
            data: order
        });

    } catch (error) {

        next(error);

    }
}

export {getOrderByIdController, createOrderController}