import { Module } from '@nestjs/common';
import { OrderService } from './services';
import { DbModule } from '../db/db.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from '../db/entities/orders.entity';
import { Carts } from '../db/entities/carts.entity';
import { OrderController } from './order.controller';

@Module({
  imports: [DbModule],
  providers: [OrderService],
  controllers: [OrderController],
  // exports: [OrderService],
})
export class OrderModule {}
