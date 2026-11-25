import { Router } from "express";
const router = Router()
import {createProductController, getProductController} from "../controller/product.controller";
import { validateCreateProduct } from "../validation/validation";

router.get('/', getProductController)
// router.get('/:id', getSingleProductController)
router.post('/', validateCreateProduct, createProductController)
// router.put('/', createProductController)
// router.patch('/', createProductController)
// router.delete('/:id', DeleteProductController)


export default router