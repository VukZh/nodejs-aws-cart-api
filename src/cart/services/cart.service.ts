import { Injectable } from '@nestjs/common';

import { v4 } from 'uuid';

import { Cart, CartItem, StatusType } from '../models';
import { InjectRepository } from '@nestjs/typeorm';
import { Carts } from '../../db/entities/carts.entity';
import { Repository } from 'typeorm';
import { CartItems } from '../../db/entities/cartItems.entity';
import { Products } from '../../db/entities/products.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Carts)
    private readonly cartsRepo: Repository<Carts>,
    @InjectRepository(CartItems)
    private readonly cartItemsRepo: Repository<CartItems>,
    @InjectRepository(Products)
    private readonly productsRepo: Repository<Products>,
  ) {}

  async findByUserId(userId: string): Promise<Cart> {
    try {
      return await this.cartsRepo.findOne({
        where: {
          userId: userId,
        },
      });
    } catch (e) {
      return e.message;
    }
  }

  async createByUserId(userId: string): Promise<Cart> {
    try {
      const id = v4();
      const userCart = {
        id,
        userId,
        createdAt: new Date(),
        updatedAt: new Date(),
        status: StatusType.OPEN,
      };
      await this.cartsRepo.insert(userCart);
      return userCart;
    } catch (e) {
      return e.message;
    }
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    try {
      const userCart = await this.findByUserId(userId);
      if (userCart) {
        return userCart;
      }
      return this.createByUserId(userId);
    } catch (e) {
      return e.message;
    }
  }

  async updateByUserId(userId: string, items: Array<CartItem>): Promise<Cart> {
    try {
      const { id, ...rest } = await this.findOrCreateByUserId(userId);
      const updatedCart = {
        id,
        ...rest,
        updatedAt: new Date(),
      };
      await this.cartsRepo.update({ id }, updatedCart);
      for await (const item of items) {
        const cartItem = await this.cartItemsRepo.findOne({
          where: {
            cartId: id,
          },
        });
        if (cartItem) {
          await this.cartItemsRepo.update({ cartId: id }, cartItem);
        } else {
          await this.cartItemsRepo.insert({ ...item, cartId: id });
        }
      }
      return updatedCart;
    } catch (e) {
      return e.message;
    }
  }

  async removeByUserId(userId): Promise<Cart> {
    try {
      const cart = await this.findByUserId(userId);
      await this.cartsRepo.update(userId, {
        ...cart,
        status: StatusType.ORDERED,
      });
      return {
        ...cart,
        status: StatusType.ORDERED,
      };
    } catch (e) {
      return e.message;
    }
  }

  async findItems(userId): Promise<Array<CartItem>> {
    try {
      const userCart = await this.findOrCreateByUserId(userId);
      const { id } = userCart;
      const cartItems = this.cartItemsRepo.find({
        where: {
          cartId: id,
        },
      });
      return cartItems;
    } catch (e) {
      return e.message;
    }
  }

  async findProducts(): Promise<Array<Products>> {
    try {
      const products = await this.productsRepo.find();
      return products;
    } catch (e) {
      return e.message;
    }
  }
}
