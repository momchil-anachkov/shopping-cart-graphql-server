import { ShoppingCartItem } from './shopping-cart-item.type';

export interface ShoppingCart {
  id: string;
  items: ShoppingCartItem[];
}
