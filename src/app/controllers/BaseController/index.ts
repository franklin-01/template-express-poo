import { Router } from 'express';
import { IRoute } from '../../interfaces/IRouter';

export abstract class Controller {
  public abstract readonly path: string;
  public router: Router = Router();
  protected abstract readonly routes: IRoute[];

  public abstract readonly allowDatabase: boolean;
  protected db: unknown | undefined;

  public setDatabase(Database: unknown): void {
    this.db = Database;
  }

  public setRoutes = (): Router | never => {
    for (const route of this.routes) {
      try {
        for (const middleware of route.localMiddlewares) {
          this.router.use(middleware);
        }
        this.router[route.method](route.path, route.handler);
      } catch (error) {
        console.log('not a valid method: ', error);
      }
    }
    return this.router;
  };
}
