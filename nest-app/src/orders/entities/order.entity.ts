import { BaseEntity } from "src/common/base.entity";
import { Product } from "src/product/entities/product.entity";

export class Order extends BaseEntity {
    id?: string;
    products: Product[];
}
