import { Product } from '../entities/product.entity';
import {
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateProductDto extends Product {
  @IsString()
  @MaxLength(30)
  title: string;

  @MaxLength(200)
  description: string;
  
  @IsString()
  listPrice: number;
  
  @IsString()
  stock: number;
}