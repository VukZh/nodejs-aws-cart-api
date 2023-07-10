import { Module } from '@nestjs/common';
import { OrderService } from './services';
import { DbModule } from '../db/db.module';

@Module({
  providers: [OrderService, DbModule],
  exports: [OrderService],
})
export class OrderModule {}
