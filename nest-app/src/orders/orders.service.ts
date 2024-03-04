import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

import { PrismaService } from '../prisma/prisma.service';
import { Order } from './entities/order.entity';
@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    const { productIds } = createOrderDto;

    const order = await this.prisma.order.create({
      data: {
        products: {
          connect: productIds.map(id => ({ id })),
        },
      },
      include: {
        products: true,
      },
    });

    return order;
  }

  findAll() {
    return this.prisma.order.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  async findOrdersByProductId(productId: string) {
    return this.prisma.order.findMany({
      where: {
        products: {
          some: {
            id: productId,
          },
        },
      },
      include: {
        products: true,
      },
    });
  }

  async findById(id: string): Promise<Order>{
    const data = await this.prisma.order.findUnique({ 
      where: { id },
      include: {
        products: true,
      },
    })

    return data;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  async deleteOrder(id: string) {
    const data = await this.findById(id)

    return this.prisma.order.delete({where: {id}})
  }
}
