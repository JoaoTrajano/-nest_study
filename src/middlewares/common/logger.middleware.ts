import { NextFunction, Request, Response } from 'express';

import { NestMiddleware } from '@nestjs/common';

export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    next();
  }
}
