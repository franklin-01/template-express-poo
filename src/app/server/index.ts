import { Application, RequestHandler } from 'express';
import { Controller } from '../controllers/BaseController';

export class Server {
  private database = {};

  constructor(
    private app: Application,
    private readonly port: number,
  ) {}

  public run(): void {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }

  public loadGlobalMiddlewares(middlewares: RequestHandler[]): void {
    middlewares.forEach((middleware: RequestHandler) => {
      this.app.use(middleware);
    });
  }

  public loadControllers(controllers: Controller[]): void {
    controllers.forEach((controller: Controller) => {
      if (controller.allowDatabase) {
        controller.setDatabase(this.database);
      }
      this.app.use(controller.path, controller.setRoutes());
    });
  }
}
