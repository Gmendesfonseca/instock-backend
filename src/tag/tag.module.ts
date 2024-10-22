import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { TagServiceInterface } from './interfaces/tag.service.interface';
import { TagService } from './tag.service';
import { TagRepositoryInterface } from './interfaces/tag.repository.interface';
import { TagSequelizeRepository } from './repositories/tag.sequelize.repository';
import { Tag } from './tag.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Tag])],
  providers: [
    {
      provide: TagServiceInterface.TagService,
      useClass: TagService,
    },
    {
      provide: TagRepositoryInterface.TagRepository,
      useClass: TagSequelizeRepository,
    },
  ],
  controllers: [TagController],
})
export class TagModule {}
