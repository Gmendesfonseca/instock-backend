import {
  Body,
  Controller,
  Get,
  HttpCode,
  Logger,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';

import { AuthenticateDto } from './dto/authenticate.dto';
import { AuthServiceInterface } from './interfaces/auth.service.interface';

@Controller()
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthServiceInterface.AuthService) { }

  @Post('auth')
  @HttpCode(200)
  authenticate(@Body() authDto: AuthenticateDto) {
    this.logger.debug('AuthController.authenticate: Called');
    return this.authService.authenticate(authDto);
  }

  @Get('me')
  @HttpCode(200)
  me(@Req() request: Request) {
    this.logger.debug('AuthController.me: Called');
    const { auth } = request;
    return this.authService.me(auth);
  }
}
