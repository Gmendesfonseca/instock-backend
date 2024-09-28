import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UsersController } from 'src/user/user.controller';
import { UserRepositoryInterface } from './interfaces/user.repository.interface';
import { UserSequelizeRepository } from './repositories/user.sequelize.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { UserServiceInterface } from './interfaces/user.service.interface';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [
    {
      provide: UserRepositoryInterface.UserRepository,
      useClass: UserSequelizeRepository,
    },
    {
      provide: UserServiceInterface.UserService,
      useClass: UserService,
    },
  ],
  controllers: [UsersController],
  exports: [UserRepositoryInterface.UserRepository],
})
export class UsersModule {}
