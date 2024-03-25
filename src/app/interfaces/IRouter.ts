import { Response, Request, NextFunction } from 'express';
import { httpMethod } from '../../enums/httpMethod';

export interface IRoute {
  path: string;
  method: httpMethod;
  handler: (req: Request, res: Response) => void;
  localMiddlewares: ((
    req: Request,
    res: Response,
    next: NextFunction,
  ) => void)[];
}
