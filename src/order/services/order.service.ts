import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from '../../db/entities/orders.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Orders)
    private readonly OrdersRepo: Repository<Orders>,
  ) {}

  async findById(orderId: string): Promise<Orders> {
    try {
      return await this.OrdersRepo.findOne({
        where: {
          id: orderId,
        },
      });
    } catch (e) {
      return e.message;
    }
  }

  async create(data: any): Promise<Orders> {
    try {
      const id = v4();
      const order = {
        ...data,
        id,
        status: 'inProgress',
      };

      await this.OrdersRepo.insert(order);
      return order;
    } catch (e) {
      return e.message;
    }
  }

  async update(orderId, data): Promise<Orders> {
    try {
      const order = await this.findById(orderId);

      if (!order) {
        throw new Error('Order does not exist.');
      }
      await this.OrdersRepo.update({ id: orderId }, { ...data });
      return {
        id: orderId,
        ...data,
      };
    } catch (e) {
      return e.message;
    }
  }
}
