export interface OrderRow {
    order_id: string;
    status: string;
    total_amount: string;
    customer_name: string;
    customer_email: string;
    product_id: string | null;
    product_name: string | null;
    quantity: number | null;
    unit_price: string | null;
}
export interface OrderItemInput {
    productId: string;
    quantity: number;
}

export interface CreateOrderInput {
    userId: string;
    items: OrderItemInput[];
}
export interface ProductRow {
    id: string;
    name: string;
    price: string;
    stock: number;
}

export interface CreatedOrderRow {
    id: string;
    user_id: string;
    status: string;
    total_amount: string;
}