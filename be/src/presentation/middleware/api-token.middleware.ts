import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ApiTokenPaymentException } from '../exceptions/api-token-payement.exception';
@Injectable()
export class ApiTokenMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    next();
  }
}
