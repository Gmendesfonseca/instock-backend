import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthDto } from 'src/DTO/Auth/AuthDTO';
import { AppService } from 'src/Services/app.service';
import { ValidationPipe } from 'validation/validation.pipe';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('auth')
  getBearerToken(
    @Body(new ValidationPipe()) { email, password }: AuthDto,
  ): Promise<string> {
    return this.appService.authenticate({ email, password });
  }
}
