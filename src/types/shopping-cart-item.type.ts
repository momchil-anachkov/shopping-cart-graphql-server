import { CatalogueItem } from './catalogue-item.type';
import { ObjectId } from 'bson';

export interface ShoppingCartItem {
  item: ObjectId;
  amount: number;
}
