import { Collection, ObjectId, ObjectID } from 'mongodb';
import { connectionUtil, ConnectionUtil } from '../database/connection-util';
import { ShoppingCartItem } from '../types/shopping-cart-item.type';
import { ShoppingCart } from '../types/shopping-cart.type';

export class ShoppingCartRepository {
  private collection: Collection;

  constructor(
    private connection: ConnectionUtil,
  ) {
    (async () => {
      await this.connection.connected;
      this.collection = this.connection.db.collection('users');
    })();
  }

  public addItemToCart = async (username: string, _id: string): Promise<ShoppingCart> => {
    const cart: ShoppingCartItem[] = (await this.collection.findOne({ username })).cart;

    const cartItem = cart.find((item) => {
      return item.item.toHexString() === _id;
    });

    if (!!cartItem) {
      cartItem.amount++;
    } else {
      cart.push({
        item: new ObjectID(_id),
        amount: 1,
      });
    }

    return this.collection.findOneAndUpdate(
      { username },
      { $set: { cart } },
      { returnOriginal: false }
    ).then(
      (user) => {
        if (user.ok) {
          return {
            id: user.value._id,
            items: user.value.cart,
          };
        }
      }
    );
  }

  public removeItemFromCart = async (username: string, _id: string): Promise<ShoppingCart> => {
    const cart: ShoppingCartItem[] = (await this.collection.findOne({ username })).cart;

    const cartItemIndex = cart.findIndex((item) => {
      return item.item.toHexString() === _id;
    });


    if (cartItemIndex !== -1) {
      cart.splice(cartItemIndex, 1);
      return this.collection.findOneAndUpdate(
        { username },
        { $set: { cart } },
        { returnOriginal: false }
      ).then(
        (user) => {
          if (user.ok) {
            return {
              id: user.value._id,
              items: user.value.cart,
            };
          }
        }
      );
    } else {
      throw new Error('Item not found');
    }

  }

  public setItemAmount = async (username: string, _id: string, amount: number): Promise<ShoppingCart> => {
    const cart: ShoppingCartItem[] = (await this.collection.findOne({ username })).cart;

    const cartItem = cart.find((item) => {
      return item.item.toHexString() === _id;
    });

    if (!!cartItem) {
      cartItem.amount = amount;
      return this.collection.findOneAndUpdate(
        { username },
        { $set: { cart } },
        { returnOriginal: false }
      ).then(
        (user) => {
          if (user.ok) {
            return {
              id: user.value._id,
              items: user.value.cart,
            };
          }
        });
    } else {
      throw new Error('Item not found');
    }
  }

  public clearCart = async (username: string): Promise<ShoppingCart> => {
    return this.collection.findOneAndUpdate(
      { username },
      { $set: { cart: [] } },
      { returnOriginal: false }
    ).then(
      (user) => {
        if (user.ok) {
          return {
            id: user.value._id,
            items: user.value.cart,
          };
        }
      });
  }

  public getShoppingCart = (username: string): Promise<ShoppingCart> => {
    return this.collection
      .findOne({ username })
      .then(user => ({
        id: user._id,
        items: user.cart
      }));
  }
}

export const shoppingCartRepository = new ShoppingCartRepository(connectionUtil);
