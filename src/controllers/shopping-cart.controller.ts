import { shoppingCartService as service, ShoppingCartService } from '../services/shopping-cart.service';

class ShoppingCartController {
  constructor(
    private shoppingCart: ShoppingCartService
  ) {
  }
}

const shoppingCartController = new ShoppingCartController(service);

export default shoppingCartController;
