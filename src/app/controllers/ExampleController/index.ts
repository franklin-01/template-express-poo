import { httpMethod } from '../../../enums/httpMethod';
import { IRoute } from '../../interfaces/IRouter';
import { Controller } from '../BaseController';
import { MyExample01 } from './handlers/myExample01';

export class ExampleController extends Controller {
  public path: string = '/example';
  protected routes: IRoute[];
  public allowDatabase: boolean = true;

  private myExample01: MyExample01 = new MyExample01(this);

  constructor() {
    super();
    this.routes = [
      {
        path: '/myExample01',
        method: httpMethod.GET,
        localMiddlewares: this.myExample01.middlewares,
        handler: this.myExample01.handler,
      },
    ];
  }

  public getDataBase(): typeof this.db {
    return this.db;
  }
}
