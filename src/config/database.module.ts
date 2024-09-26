import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  SequelizeModule,
  SequelizeModuleAsyncOptions,
} from '@nestjs/sequelize';
import { User } from 'src/user/user.model';
import { ConfigProperties } from './config.module';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: (configService: ConfigService<ConfigProperties>) => {
        return {
          models: [User, Comment],
          logging: configService.get('DB_LOGGING'),
          autoLoadModels: configService.get('DB_AUTO_LOAD_MODELS'),
          dialect: 'postgres',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          database: configService.get('DB_DATABASE'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
        } as SequelizeModuleAsyncOptions;
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
