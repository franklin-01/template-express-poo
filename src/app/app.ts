import express, { Application } from 'express';
import { Server } from './server';
import { ExampleController } from './controllers/ExampleController';

const app: Application = express();

const AppServer: Server = new Server(app, 3000);

AppServer.loadGlobalMiddlewares([
  express.json({
    strict: true,
    verify: (_, res, buf) => {
      try {
        JSON.parse(buf.toString());
      } catch (error) {
        res.statusCode = 400;
        res.end();
      }
    },
  }),
]);

AppServer.loadControllers([new ExampleController()]);

export default AppServer;
