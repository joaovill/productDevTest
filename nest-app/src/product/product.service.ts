import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.product.findMany();
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {

    const formattedListPrice = parseFloat(createProductDto.listPrice.toString());
    const formattedStock = parseInt(createProductDto.stock.toString());

    const data: Prisma.ProductCreateInput = {
      ...createProductDto,
      listPrice: formattedListPrice,
      stock: formattedStock,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const createdProduct = await this.prisma.product.create({ data });

    return {
      ...createdProduct
    };
  }

  async findById(id: string): Promise<Product>{
    const data = await this.prisma.product.findUnique({ where: { id }})

    return data 
  }


  async deleteProduct(id: string) {
    const data = await this.findById(id)

    return this.prisma.product.delete({where: {id}})
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const data = await this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });

    return data;
  }
  
}
