import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Logger,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto, UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('/users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @HttpCode(200)
  getUser(@Param('id', new ParseUUIDPipe()) id: string) {
    this.logger.debug('UsersController.getUser: Called');
    return this.userService.findOne(id);
  }

  @Post('/create')
  @HttpCode(201)
  createUser(@Body() body: CreateUserDto) {
    this.logger.debug('UsersController.createUser: Called');
    return this.userService.create(body);
  }

  @Put(':id')
  @HttpCode(204)
  updateUser(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateUserDto,
  ) {
    this.logger.debug('UsersController.updateUser: Called');
    return this.userService.update(id, body);
  }

  @Put(':id/password/:password')
  @HttpCode(204)
  updatePassword(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() { password }: UpdatePasswordDto,
  ) {
    this.logger.debug('UsersController.updatePassword: Called');
    return this.userService.updatePassword(id, password);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    this.logger.debug('UsersController.deleteUser: Called');
    return this.userService.remove(id);
  }
}
