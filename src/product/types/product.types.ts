export interface Product {
 id: number,
 name: string,
 price: number,
 stock: number
 created_at: Date;
}
export type CreateProductInput = Omit<Product, 'id' | "created_at">
export type UpdateProductInput = Partial<CreateProductInput>