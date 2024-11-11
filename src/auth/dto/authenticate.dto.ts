import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class AuthenticateDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'user@example.com',
  })
  @IsEmail()
  readonly email: string;
  @ApiProperty({
    description: 'The password of the user',
    example: 'password',
  })
  @IsString()
  readonly password: string;
}
