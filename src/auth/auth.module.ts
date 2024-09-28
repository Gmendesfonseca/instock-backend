import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ConfigProperties } from '../config/config.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { AuthController } from 'src/auth/auth.controller';
import { UsersModule } from 'src/user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Auth } from './auth.model';
import { AuthRepositoryInterface } from './interfaces/auth.repository.interface';
import { AuthSequelizeRepository } from './repositories/auth.sequelize.repository';
import { AuthServiceInterface } from './interfaces/auth.service.interface';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule, UsersModule],
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
    SequelizeModule.forFeature([Auth]),
    ConfigModule,
    UsersModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: AuthRepositoryInterface.AuthRepository,
      useClass: AuthSequelizeRepository,
    },
    {
      provide: AuthServiceInterface.AuthService,
      useClass: AuthService,
    },
  ],
  controllers: [AuthController],
  exports: [
    {
      provide: AuthServiceInterface.AuthService,
      useClass: AuthService,
    },
  ],
})
export class AuthModule {}
