import { Router } from "express";
const router = Router()
import {createProductController, DeleteProductController, getProductController, getSingleProductController, patchProductController}
from "../controller/product.controller";
import { validateCreateProduct } from "../validation/validation";

router.get('/', getProductController)
router.get('/:id', getSingleProductController)
router.post('/', validateCreateProduct, createProductController)
// router.put('/:id', putProductController)
router.patch('/:id', patchProductController)
router.delete('/:id', DeleteProductController)


export default router