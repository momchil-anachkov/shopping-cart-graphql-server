import { shoppingCartRepository, ShoppingCartRepository } from '../repositories/shoppping-cart.repository';
import { CatalogueRepository, catalogueRepository } from '../repositories/catalogue.repository';
import { ShoppingCart } from '../types/shopping-cart.type';

export class ShoppingCartService {
  constructor(
    private shoppingCart: ShoppingCartRepository,
    private catalogue: CatalogueRepository,
  ) {
  }

  addItemToCart = (username: string, id: string): Promise<ShoppingCart>  => {
    return this.shoppingCart.addItemToCart(username, id);
  }

  removeItemFromCart = (username: string, id: string): Promise<ShoppingCart>  => {
    return this.shoppingCart.removeItemFromCart(username, id);
  }

  setItemAmount = (username: string, id: string, amount: number): Promise<ShoppingCart>  => {
    return this.shoppingCart.setItemAmount(username, id, amount);
  }

  checkout = (username: string): Promise<ShoppingCart>  => {
    return this.shoppingCart.clearCart(username);
  }

  getShoppingCart = (username: string): Promise<ShoppingCart> => {
    return this.shoppingCart.getShoppingCart(username);
  }

}

export const shoppingCartService = new ShoppingCartService(shoppingCartRepository, catalogueRepository);
