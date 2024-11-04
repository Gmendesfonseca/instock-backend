import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/user/user.model';
import { ConfigProperties } from './config.module';
import { Company } from 'src/company/company.model';
import { Person } from 'src/person/person.model';
import { Tag } from 'src/tag/tag.model';
import { Project } from 'src/project/project.model';
import { SyncService } from './sync.service';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<ConfigProperties>) => {
        return {
          models: [User, Company, Person, Project, Tag],
          logging: configService.get('DB_LOGGING'),
          autoLoadModels: configService.get('DB_AUTO_LOAD_MODELS'),
          dialect: 'postgres',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          database: configService.get('DB_DATABASE'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [SyncService],
})
export class DatabaseModule {}
