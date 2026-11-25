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



import { CreateProductInput, Product, UpdateProductInput } from "../types/product.types";
import * as productRepository from "../repositories/product.repository";

export async function createProduct(data: CreateProductInput) {
    return await productRepository.createProduct(data);
}

export async function getProductService():Promise<Product[]> {
    return await productRepository.getProductRepo()
}


export async function getSingleProductService(id: string | null):Promise<Product | null> {
    return await productRepository.getSingleProductRepo(id)
}

export async function delSingleProductService(id: string | null):Promise<number | null> {
    return await productRepository.deleteSingleProductRepo(id)
}

export async function patchProductService(id: string | null, data: UpdateProductInput):Promise<Product | undefined> {
    return await productRepository.patchProductRepo(id, data)
}

export async function putProductService(id: string | null, data: CreateProductInput):Promise<Product | undefined> {
    return await productRepository.putProductRepo(id, data)
}