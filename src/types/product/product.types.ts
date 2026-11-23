export interface Product {
 id: number,
 name: string,
 price: number,
 stock: number
}
export type CreateProductInput = Omit<Product, 'id'>
export type UpdateProductInput = Partial<CreateProductInput>