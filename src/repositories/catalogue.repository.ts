import { CatalogueItem } from '../types/catalogue-item.type';
import { Collection, ObjectID } from 'mongodb';
import { connectionUtil, ConnectionUtil } from '../database/connection-util';

export class CatalogueRepository {
  private collection: Collection;

  constructor(
    private connection: ConnectionUtil,
  ) {
    (async () => {
      await this.connection.connected;
      this.collection = this.connection.db.collection('shopping-catalogue');
    })();
  }

  public findOne = (_id: ObjectID): Promise<CatalogueItem> => {
    return this.collection.findOne({ _id } );
  }

  public getAll = (): Promise<CatalogueItem[]> => {
    return this.collection.find({}).toArray();
  }
}

export const catalogueRepository = new CatalogueRepository(connectionUtil);
