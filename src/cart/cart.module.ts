import { Module } from '@nestjs/common';

import { CartController } from './cart.controller';
import { CartService } from './services';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  providers: [CartService],
  controllers: [CartController]
})
export class CartModule {}
