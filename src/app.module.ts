import { Module } from '@nestjs/common';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import { AppController } from './app.controller';

import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { Carts } from './entities/Carts';
import { Orders } from './entities/Order';
import { CartItems } from './entities/CartItems';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import { User } from './users/entity/User';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  // synchronize: true,
  logging: true,
  entities: [Carts, CartItems, Orders, User],
  subscribers: [],
  migrations: [],
};

@Module({
  imports: [AuthModule, CartModule, OrderModule, TypeOrmModule.forRoot(config)],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
