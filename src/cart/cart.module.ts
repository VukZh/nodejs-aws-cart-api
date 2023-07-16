import { Module } from '@nestjs/common';

import { OrderModule } from '../order/order.module';

import { CartController } from './cart.controller';
import { CartService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carts } from '../entities/Carts';
import { CartItems } from '../entities/CartItems';
import { Orders } from '../entities/Order';

@Module({
  imports: [OrderModule, TypeOrmModule.forFeature([Carts, CartItems, Orders])],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
