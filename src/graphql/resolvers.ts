import { CatalogueItem } from '../types/catalogue-item.type';
import { catalogueService } from '../services/catalogue.service';
import { IResolvers } from 'graphql-tools';
import { shoppingCartService } from '../services/shopping-cart.service';
import { ShoppingCart } from '../types/shopping-cart.type';

export const resolvers: IResolvers = {
  CatalogueItem: {
    id: (parent) => parent._id,
  },

  ShoppingCartItem: {
    item: (parent) => {
      return catalogueService.getCatalogueItemById(parent.item);
    }
  },

  Query: {
    hello: () => 'Hello world!',

    goodbye: () => 'Bye, bye!',

    catalogue: (): Promise<CatalogueItem[]> => {
      return catalogueService.getCatalogueList();
    },

    shoppingCart: (): Promise<ShoppingCart> => {
      /* TODO: Add authentication & user context (authorization) */
      return shoppingCartService.getShoppingCart('momchil');
    }
  },

  Mutation: {

    addItemToCart: (parent, args): Promise<ShoppingCart> => {
      return shoppingCartService.addItemToCart('momchil', args.itemId);
    },

    removeItemFromCart: (parent, args): Promise<ShoppingCart> => {
      return shoppingCartService.removeItemFromCart('momchil', args.itemId);
    },

    setItemAmount: (parent, args): Promise<ShoppingCart> => {
      return shoppingCartService.setItemAmount('momchil', args.itemId, args.itemAmount);
    },

    checkout: (NO_ARGS: string): Promise<ShoppingCart> => {
      return shoppingCartService.checkout('momchil');
    }

  }
};

