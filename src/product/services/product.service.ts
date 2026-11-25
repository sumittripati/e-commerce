// import { CreateProductInput } from "../types/product.types";
// import * as productRepository from "../repositories/product.repository";

// export async function createProduct(data: CreateProductInput) {

//     if (data.price <= 0) {
//         throw new Error("Price must be greater than zero");
//     }

//     if (data.stock < 0) {
//         throw new Error("Stock cannot be negative");
//     }

//     const product = await productRepository.createProduct(data);

//     return product;
// }



import { CreateProductInput } from "../types/product.types";
import * as productRepository from "../repositories/product.repository";

export async function createProduct(data: CreateProductInput) {

    return await productRepository.createProduct(data);

}