import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { CartItems } from './entities/cart_items.entity';
import { Carts } from './entities/carts.entity';
import { Products } from './entities/products.entity';
import { Stocks } from './entities/stocks.entity';
import * as process from 'process';

import dotenv from "dotenv";
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST,
      port: +process.env.PG_PORT,
      username: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      entities: [CartItems, Carts, Products, Stocks],
      logging: true,
      namingStrategy: new SnakeNamingStrategy(),
    }),
    TypeOrmModule.forFeature([CartItems, Carts, Products, Stocks]),
  ],
  exports: [TypeOrmModule],
})
export class DbModule {}