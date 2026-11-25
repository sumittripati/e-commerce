import { Router } from "express";
const router = Router()
import createProductController from "../controller/product.controller";
import { validateCreateProduct } from "../validation/validation";

router.post('/', validateCreateProduct, createProductController)

export default router