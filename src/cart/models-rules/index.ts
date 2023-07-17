import { Carts } from '../../entities/Carts';
import { CartItems } from '../../entities/CartItems';

/**
 * @param {Carts} cart
 * @returns {number}
 */
export function calculateCartTotal(cart: Carts): number {
  return cart
    ? cart.items.reduce((acc: number, { price, count }: CartItems) => {
        return acc + price * count;
      }, 0)
    : 0;
}
