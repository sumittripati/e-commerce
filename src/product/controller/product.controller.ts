// import { Request, Response } from "express"
// import { CreateProductInput, Product } from "../types/product.types";
// import pool from "../../config/db";
// import * as productService from "../services/product.service";

// const createProductController = async (req: Request, res: Response)=>{
//     try {
//         // const {name, price, stock} = req.body;
//         // if(!name || !price || !stock){
//         //     return res.status(400).json({
//         //         success: false,
//         //         message: "All fields are require"
//         //     })
//         // }
//         // const input: CreateProductInput = {name, price, stock};
  
//         // const result = await pool.query<Product>(
//         // `INSERT INTO products (name, price, stock)
//         // VALUES ($1, $2, $3)
//         // RETURNING id, name, price, stock, created_at`,
//         // [input.name, input.price, input.stock]
//         // );

//         // const product = result.rows[0];

//         return res.status(201).json({success: true, message: "product created successfully", data: product});
//         } catch (error) {

//         return res.status(500).json({
//             success: false,
//             message: error
//         })
//     }
// }

// export default createProductController



import { Request, Response, NextFunction } from "express"
import * as productService from "../services/product.service";
import {parseId} from '../validation/validation'
import strict from "node:assert/strict";

const getProductController = async (req: Request, res: Response, next: NextFunction)=>{
    try {

        const product = await productService.getProductService();

        return res.status(201).json({success: true, message: "product created successfully", data: product});
    }
    catch (error) {
        console.log("error in getting product", error)
        // return res.status(500).json({
        //     success: false,
        //     message: "error in getting product"
        // })
        next(error);
    }
}

const getSingleProductController = async (req: Request, res: Response)=>{
    try {
        const id: string | null = parseId(req.params.id);
        
        const product = await productService.getSingleProductService(id);

        return res.status(201).json({success: true, message: "product created successfully", data: product});
    }
    catch (error) {
        console.log("error in getting product", error)
        return res.status(500).json({
            success: false,
            message: "error in getting product"
        })
    }
}

const createProductController = async (req: Request, res: Response)=>{
    try {
        const data = req.body;
        const product = await productService.createProduct(data);

        return res.status(201).json({success: true, message: "product created successfully", data: product});
    }
    catch (error) {
        console.log("error in creating product", error)
        return res.status(500).json({
            success: false,
            message: "error in creating product"
        })
    }
}

const patchProductController = async(req: Request, res: Response)=>{
      try {
        const id: string | null = parseId(req.params.id);
        const data = req.body;
        const product = await productService.patchProductService(id, data);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: product
        });

      } catch (error) {
        console.log("error in patching of product", error)
        return res.status(500).json({
            success: false,
            message: "error in patching of product"
        })
      }
}

const putProductController = async(req: Request, res: Response)=>{
      try {
        const id: string | null = parseId(req.params.id);
        const data = req.body;
        const product = await productService.putProductService(id, data);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: product
        });

      } catch (error) {
        console.log("error in putching of product", error)
        return res.status(500).json({
            success: false,
            message: "error in putching of product"
        })
      }
}

const DeleteProductController = async(req: Request, res: Response)=>{
      try {
        const id: string | null = parseId(req.params.id);
        const deleted = await productService.delSingleProductService(id);
        if (!id) {
            return res.status(400).json({
            message: "Invalid product ID",
        }); 
        }

        if (!deleted) {
            return res.status(404).json({
            message: "Product not found",
            });
        }

        return res.status(204).json({
            success: true,
            message: `product ${deleted} is deleted successfullt`
        });


      } catch (error) {
        console.log("error in deleting product", error)
        return res.status(500).json({
            success: false,
            message: "error in deleting product"
        })
      }
}


export async function searchProductsController(
    req: Request,
    res: Response
) {
    try {
        const { minPrice, maxPrice } = req.query;

        if (
            typeof minPrice !== "string" ||
            typeof maxPrice !== "string"
        ) {
            return res.status(400).json({
                success: false,
                message: "Price range is required"
            });
        }

        if (
            !/^\d{1,10}(\.\d{1,2})?$/.test(minPrice) ||
            !/^\d{1,10}(\.\d{1,2})?$/.test(maxPrice) ||
            Number(minPrice) > Number(maxPrice)
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid price range"
            });
        }

        const products = await productService.searchProductService(minPrice, maxPrice);
            

        return res.status(200).json({
            success: true,
            data: products
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to search products"
        });
    }
}

export { createProductController, getProductController,  getSingleProductController, DeleteProductController, patchProductController, putProductController};