import {
  Body,
  Controller,
  Get,
  HttpCode,
  Logger,
  Post,
  Query,
} from '@nestjs/common';

import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Post('auth')
  @HttpCode(200)
  authenticate(@Body() authDto: AuthDto) {
    this.logger.debug('AuthController.authenticate: Called');
    return this.authService.authenticate(authDto);
  }

  @Get('me')
  @HttpCode(200)
  async getToken(@Query('userId') userId: string): Promise<any> {
    this.logger.debug('AuthController.getToken: Called');
    const token = await this.authService.generateAuth(userId);
    return { access_token: token };
  }
}
