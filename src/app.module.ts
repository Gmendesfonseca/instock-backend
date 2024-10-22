import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './user/user.module';
import { HttpExceptionFilter } from 'src/exceptions/HttpExceptionFilter';
import { APP_FILTER } from '@nestjs/core';
import { LimitModule } from 'src/config/limit.module';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from 'src/config/database.module';
import { PaginationMiddleware } from 'src/middleware/pagination/pagination.middleware';
import { SwaggerModule } from '@nestjs/swagger';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [
    LimitModule,
    ConfigModule,
    AuthModule,
    DatabaseModule,
    JwtModule,
    UsersModule,
    TagModule,
    SwaggerModule,
  ],
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
