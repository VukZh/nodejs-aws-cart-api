import { Module } from '@nestjs/common';
import { OrderService } from './services';
import { DbModule } from '../db/db.module';
import { OrderController } from './order.controller';

@Module({
  imports: [DbModule],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}
