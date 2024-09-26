import { NextFunction, Request, Response } from 'express';
import { PaginationMiddleware } from './pagination.middleware';
import { BadRequestException } from '@nestjs/common';

describe('PaginationMiddleware', () => {
  let paginationMiddleware: PaginationMiddleware;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    paginationMiddleware = new PaginationMiddleware();
    req = { query: {} };
    res = {};
    next = jest.fn();
  });

  it('should be defined', () => {
    expect(new PaginationMiddleware()).toBeDefined();
  });

  it('should set default page and perPage if not provided', () => {
    paginationMiddleware.use(req as Request, res as Response, next);

    expect(req.query.page).toBe('1');
    expect(req.query.perPage).toBe('10');
    expect(next).toHaveBeenCalled();
  });

  it('should keep provided page and perPage if valid', () => {
    req.query.page = '2';
    req.query.perPage = '15';

    paginationMiddleware.use(req as Request, res as Response, next);

    expect(req.query.page).toBe('2');
    expect(req.query.perPage).toBe('15');
    expect(next).toHaveBeenCalled();
  });

  it('should throw BadRequestException if perPage is greater than 30', () => {
    req.query.page = '1';
    req.query.perPage = '31';

    expect(() => paginationMiddleware.use(req as Request, res as Response, next)).toThrow(
      BadRequestException,
    );
  });

  it('should set default page if page is not provided', () => {
    req.query.perPage = '10';

    paginationMiddleware.use(req as Request, res as Response, next);

    expect(req.query.page).toBe('1');
    expect(req.query.perPage).toBe('10');
    expect(next).toHaveBeenCalled();
  });

  it('should set default perPage if perPage is not provided', () => {
    req.query.page = '2';

    paginationMiddleware.use(req as Request, res as Response, next);

    expect(req.query.page).toBe('2');
    expect(req.query.perPage).toBe('10');
    expect(next).toHaveBeenCalled();
  });
});
