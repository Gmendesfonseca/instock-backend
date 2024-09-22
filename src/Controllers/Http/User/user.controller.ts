import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ParamsDto } from 'src/DTO/Params/ParamsDto';
import { CreateUser } from 'src/DTO/User/CreateDTO';
import { UpdateUser } from 'src/DTO/User/UpdateDto';
import { User } from 'src/Entities/user.entity';
import { UsersService } from 'src/Services/users.service';
import { ValidationPipe } from 'validation/validation.pipe';

@Controller()
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get(':id')
  @HttpCode(200)
  getUser(@Param(new ValidationPipe()) { id }: ParamsDto): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post('/user')
  @HttpCode(201)
  createUser(@Body(new ValidationPipe()) body: CreateUser): Promise<User> {
    return this.userService.create(body);
  }

  @Put(':id')
  @HttpCode(204)
  updateUser(
    @Param(new ValidationPipe()) { id }: ParamsDto,
    @Body(new ValidationPipe()) body: UpdateUser,
  ): Promise<User> {
    return this.userService.update(id, body);
  }

  @Put(':id/password/:password')
  @HttpCode(204)
  updatePassword(
    @Param(new ValidationPipe()) { id, password }: ParamsDto,
  ): Promise<User> {
    return this.userService.updatePassword(id, password);
  }

  @Put(':id/email/:email')
  @HttpCode(204)
  updateEmail(
    @Param(new ValidationPipe()) { id, email }: ParamsDto,
  ): Promise<User> {
    return this.userService.updateEmail(id, email);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param() { id }: ParamsDto): Promise<void> {
    return this.userService.remove(id);
  }
}
