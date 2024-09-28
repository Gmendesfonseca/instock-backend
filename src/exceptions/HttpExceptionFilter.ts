import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  PayloadTooLargeException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ThrottlerException } from '@nestjs/throttler';

import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    switch (exception.constructor) {
      case NotFoundException:
        return response.status(HttpStatus.NOT_FOUND).json({
          code: 404,
          icTrace: 6404,
          message: exception.message,
        });

      case UnauthorizedException:
        return response.status(HttpStatus.UNAUTHORIZED).json({
          code: 401,
          icTrace: 6401,
          message: exception.message,
        });

      case UnprocessableEntityException:
        const message = (exception.getResponse() as any).message;
        return response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
          code: 422,
          icTrace: 6422,
          message,
        });

      case ForbiddenException:
        return response.status(HttpStatus.FORBIDDEN).json({
          code: 403,
          icTrace: 6403,
          message: exception.message,
        });

      case BadRequestException:
        this.logger.warn({
          error: exception,
          url: request.url,
          method: request.method,
          statusCode: status,
        });
        return response.status(HttpStatus.BAD_REQUEST).json({
          code: 400,
          icTrace: 6400,
          message: exception.message,
        });

      case InternalServerErrorException:
        this.logger.error({
          error: exception,
          url: request.url,
          method: request.method,
          statusCode: status,
        });
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          code: 500,
          icTrace: 6500,
          message: exception.message,
        });

      case PayloadTooLargeException:
        this.logger.warn({
          error: exception,
          url: request.url,
          method: request.method,
          statusCode: status,
        });
        return response.status(HttpStatus.PAYLOAD_TOO_LARGE).json({
          code: 413,
          icTrace: 6513,
          message: exception.message,
        });

      case ThrottlerException:
        return response.status(HttpStatus.TOO_MANY_REQUESTS).json({
          code: 429,
          icTrace: 6429,
          message: 'Too Many Requests',
        });

      default:
        this.logger.error({
          error: exception,
          url: request.url,
          method: request.method,
          statusCode: status,
        });
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          code: status,
          icTrace: 6500,
          message: 'Internal Server Error',
        });
    }
  }
}
