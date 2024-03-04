import { IsArray, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateOrderDto {
  @IsArray()
  @IsUUID("4", { each: true })
  @IsNotEmpty()
  productIds: string[];
}