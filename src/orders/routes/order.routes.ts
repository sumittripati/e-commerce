import { Router } from "express";
import {getOrderByIdController, createOrderController} from "../controller/order.controller";

import {validateCreateOrder} from "../validation/validation";

const router = Router();

router.get("/", getOrderByIdController);
router.post("/", validateCreateOrder, createOrderController);

export default router;


