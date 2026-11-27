import { promises } from "node:dns";
import pool from "../../config/db";
import { CreateProductInput, Product, UpdateProductInput } from "../types/product.types";

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

export async function getSingleProductRepo(id: string | null): Promise<Product | null> {
    const result = await pool.query<Product>(
        `SELECT * FROM products WHERE id = $1`,
        [id]
    );
    return result.rows[0] ?? null;
}

export async function deleteSingleProductRepo(id: string | null): Promise<number | null> {
    const result = await pool.query<Product>(
        `DELETE FROM products WHERE id = $1 RETURNING id`,
        [id]
    );
    console.log("del res", result.rowCount)
    return result.rowCount;
}

export async function patchProductRepo(id: string | null, data: UpdateProductInput): Promise<Product | undefined> {
    const result = await pool.query<Product>(
      `UPDATE products
       SET
         name = COALESCE($1, name),
         price = COALESCE($2, price),
         stock = COALESCE($3, stock)
       WHERE id = $4
       RETURNING id, name, price, stock, created_at`,
      [data.name, data.price, data.stock, id]
    );
    
    return result.rows[0];
}

export async function putProductRepo(id: string | null, data: CreateProductInput): Promise<Product | undefined> {

    const result = await pool.query<Product>(
        `UPDATE products
         SET name = $1, 
         price = $2, 
         stock = $3
         WHERE id = $4
         RETURNING *`,

        [data.name, data.price, data.stock, id]
    );

    return result.rows[0];
}

export async function searchProductsRepo(
    minPrice: string,
    maxPrice: string
): Promise<Product[]> {

    const result = await pool.query<Product>(
        `SELECT id, name, price, stock, created_at
         FROM products
         WHERE price BETWEEN $1 AND $2
         ORDER BY price ASC, id ASC
         LIMIT 50`,
        [minPrice, maxPrice]
    );

    return result.rows;
}