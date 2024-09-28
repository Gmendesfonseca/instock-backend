import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class PaginationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const page = req.query.page
    const perPage = req.query.perPage

    if (!page) {
      req.query.page = '1'; 
    }

    if (!perPage) {
      req.query.perPage = '10'; 
    }

    if (parseInt(perPage as string) > 30) {
      throw new BadRequestException('The maximum number of items per page is 30');
    }

    next();
  }
}