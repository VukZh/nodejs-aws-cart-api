import { CartItem, Product } from '../models';

export function calculateCartTotal(
  carts: Array<CartItem>,
  products: Array<Product>,
): number {
  return carts
    ? carts.reduce((acc: number, cartItem) => {
        const price = products.find(
          (product) => product.id === cartItem.productId,
        ).price;
        return (acc += price * cartItem.count);
      }, 0)
    : 0;
}
