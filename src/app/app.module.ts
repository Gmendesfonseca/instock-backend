import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '../user/user.module';
import { HttpExceptionFilter } from 'src/exceptions/HttpExceptionFilter';
import { APP_FILTER } from '@nestjs/core';
import { LimitModule } from 'src/config/limit.module';
import { AuthModule } from 'src/config/auth.module';
import { DatabaseModule } from 'src/config/database.module';
import { PaginationMiddleware } from 'src/middleware/pagination/pagination.middleware';

@Module({
  imports: [LimitModule, ConfigModule, AuthModule, DatabaseModule, UsersModule],
  controllers: [],
  providers: [
    JwtService,
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PaginationMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.GET });
  }
}
