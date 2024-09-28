import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UsersController } from 'src/user/user.controller';
import { UserRepositoryInterface } from './interfaces/user.sequelize.repository';
import { UserSequelizeRepository } from './repositories/user.sequelize.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [
    {
      provide: UserRepositoryInterface.UserRepository,
      useClass: UserSequelizeRepository,
    },
    UserService,
  ],
  controllers: [UsersController],
  exports: [UserRepositoryInterface.UserRepository],
})
export class UsersModule {}
