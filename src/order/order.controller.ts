import {
  Controller,
  Get,
  Put,
  Body,
  Req,
  Post,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';

import { v4 } from 'uuid';

// import { BasicAuthGuard, JwtAuthGuard } from '../auth';
import { getOrderIdFromRequest } from '../shared';

// import { calculateCartTotal } from './models-rules';
import { OrderService } from './services';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('api/profile/order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Get()
  async findOrder(@Req() req) {
    const order = await this.orderService.findById(getOrderIdFromRequest(req));

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { order },
    };
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Put()
  async updateOrder(@Req() req, @Body() body) {
    // TODO: validate body payload...
    const orderId = getOrderIdFromRequest(req);
    await this.orderService.update(orderId, body);
    const order = await this.orderService.findById(orderId);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: {
        order,
      },
    };
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Post('checkout')
  async createOrder(@Req() @Body() body) {
    const id = v4();
    const { data } = body;
    const order = {
      ...data,
      id,
    };
    await this.orderService.create(order);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { order },
    };
  }
}
