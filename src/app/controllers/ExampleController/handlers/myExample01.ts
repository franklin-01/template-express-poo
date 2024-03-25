import { errorMessage } from '../../../../enums/errorMessage';
import { IRoute } from '../../../interfaces/IRouter';
import { Controller } from '../../BaseController';
import { NextFunction, Request, Response } from 'express';

export class MyExample01 {
  constructor(private db: Controller['db']) {}

  public handler: IRoute['handler'] = (
    request: Request,
    response: Response,
  ) => {
    console.log(this.db);

    return response.status(200).json({
      message: 'Example Route',
      requestBody: request.body.msg,
    });
  };

  public middlewares: IRoute['localMiddlewares'] = [
    //-------------------------------------------------------------------------
    (req: Request, res: Response, next: NextFunction) => {
      console.log(req.headers);

      if (!req.body.token) {
        return res.status(401).json({ message: errorMessage.INVALID_TOKEN });
      }

      next();
    },
    //-------------------------------------------------------------------------
    (req: Request, res: Response, next: NextFunction) => {
      console.log(req.body);

      if (!req.body.msg) {
        return res.status(400).json({ message: 'message not found' });
      }

      next();
    },
    //-------------------------------------------------------------------------
  ];
}
