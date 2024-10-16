import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { TagServiceInterface } from './interfaces/tag.service.interface';
import { TagService } from './tag.service';
import { TagRepositoryInterface } from './interfaces/tag.repository.interface';
import { TagSequelizeRepository } from './repositories/tag.sequelize.repository';

@Module({
  imports: [],
  providers: [
    {
      provide: TagRepositoryInterface.TagRepository,
      useClass: TagSequelizeRepository,
    },
    {
      provide: TagServiceInterface.TagService,
      useClass: TagService,
    },
  ],
  controllers: [TagController],
  exports: [],
})
export class TagModule {}
