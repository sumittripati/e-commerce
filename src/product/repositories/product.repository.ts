import { promises } from "node:dns";
import pool from "../../config/db";
import { CreateProductInput, Product } from "../types/product.types";

export async function createProduct(data: CreateProductInput) {

    const result = await pool.query(
        `INSERT INTO products (name, price, stock)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [data.name, data.price, data.stock]
    );

    return result.rows[0];
}

export async function getProductRepo(): Promise<Product[]> {
    const result = await pool.query<Product>(
        `SELECT * FROM products`
    );
    return result.rows
}
