interface Product {
    id: string;
    title: string;
    description: string;
    listPrice: number;
    stock: number;
    images: string[];
    createdAt?: string;
    updatedAt?: string;
}

interface ProductResponse {
    product: Product;
    error?: string;
}

interface ProductsResponse {
    products: Product[];
    error?: string;
}

interface ProductResponse {
    product: Product;
    error?: string;
}

interface CreateProduct {
    title: string;
    description: string;
    listPrice: string;
    stock: number;
    images: File[];
}

interface UpdateProduct {
    token: string;
    id: string;
}

interface ProductResponseWithGet extends ProductResponse {
    handleGetProducts: (token: string) => void
}

interface ProductsResponseWithGet extends ProductsResponse {
    handleGetProducts: (token: string) => void
}