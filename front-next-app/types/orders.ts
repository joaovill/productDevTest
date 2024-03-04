interface Order {
    id: string;
    products: Product[];
    createdAt?: string;
    updatedAt?: string;
}

interface OrdersResponseWithGet extends OrdersResponse {
    handleGetOrders: (token: string) => void
}

interface OrderResponseWithGet extends OrderResponse {
    handleGetOrders: (token: string) => void
    order: Order
}

interface UpdateOrder {
    token: string;
    id: string;
}

interface OrderResponse {
    order: Order;
    error?: string;
}

interface OrdersResponse {
    orders: Order[];
    error?: string;
}
