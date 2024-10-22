import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ConfigProperties } from '../config/config.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { AuthController } from 'src/auth/auth.controller';
import { UsersModule } from 'src/user/user.module';
import { AuthServiceInterface } from './interfaces/auth.service.interface';
import { UserRepositoryInterface } from 'src/user/interfaces/user.repository.interface';
import { UserSequelizeRepository } from 'src/user/repositories/user.sequelize.repository';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<ConfigProperties>) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: configService.get('JWT_EXPIRES_IN'),
          },
          global: true,
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule,
    UsersModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: AuthServiceInterface.AuthService,
      useClass: AuthService,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
