import { BaseEntity } from "src/common/base.entity";

export class Product extends BaseEntity {
    id?: string;
    description: string;
    listPrice: number;
    stock: number;
    images: string[];
}
