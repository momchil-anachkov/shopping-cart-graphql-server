import { MongoClient, Db } from 'mongodb';


export class ConnectionUtil {
  public client: MongoClient;

  public db: Db;

  public connected: Promise<void>;

  constructor() {
    this.connected = new Promise(async (resolve, reject) => {
      try {
        await this.connect();
        resolve();
      } catch (error) {
        console.log('connected error', error);
        reject(error);
      }
    });
  }

  public connect = async () => {
    const dbUrl = 'mongodb://localhost:27017/';
    try {
      const client = await MongoClient.connect(dbUrl, { useNewUrlParser: true });
      this.client = <MongoClient>client;
      this.db = this.client.db('shopping-cart');
    } catch (error) {
      console.log(error);
    }
  }

  public getClient = async () => {
    if (!this.client) {
      await this.connect();
    }
    return this.client;
  }

  public getDb = async () => {
    if (!this.db) {
      await this.connect();
    }
    return this.db;
  }
}

export const connectionUtil = new ConnectionUtil();
