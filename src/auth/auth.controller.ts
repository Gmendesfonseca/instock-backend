import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth')
  authenticate(@Body() authDto: AuthDto) {
    return this.authService.authenticate(authDto);
  }

  @Get('me')
  async getToken(@Query('userId') userId: string): Promise<any> {
    const token = await this.authService.generateAuth(userId);
    return { access_token: token };
  }
}
