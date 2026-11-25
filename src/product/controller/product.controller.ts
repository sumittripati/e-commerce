import { Request, Response } from "express"
import { CreateProductInput, Product } from "../types/product.types";
import pool from "../../config/db";
import * as productService from "../services/product.service";

const createProductController = async (req: Request, res: Response)=>{
    try {
        // const {name, price, stock} = req.body;
        // if(!name || !price || !stock){
        //     return res.status(400).json({
        //         success: false,
        //         message: "All fields are require"
        //     })
        // }
        // const input: CreateProductInput = {name, price, stock};
  
        // const result = await pool.query<Product>(
        // `INSERT INTO products (name, price, stock)
        // VALUES ($1, $2, $3)
        // RETURNING id, name, price, stock, created_at`,
        // [input.name, input.price, input.stock]
        // );

        // const product = result.rows[0];

        const data = req.body;
console.log("Controller data:", data);
        const product = await productService.createProduct(data);

        return res.status(201).json({success: true, message: "product created successfully", data: product});
        } catch (error) {

        return res.status(500).json({
            success: false,
            message: error
        })
    }
}

export default createProductController


