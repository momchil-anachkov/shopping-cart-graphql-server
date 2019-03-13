import * as express from 'express';
// import { Express } from 'express-serve-static-core';

class App {
  public express = express();

  constructor () {
    this.mountRoutes();
    console.log('app created');
  }

  private mountRoutes (): void {
    const router = express.Router();
    router.get('/', (req, res) => {
      res.json({
        message: 'Hello World!'
      });
    });
    this.express.use('/', router);
  }
}

export default new App().express;
