import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'The username of the user',
    example: 'user',
  })
  @IsString()
  readonly username?: string;
  @ApiProperty({
    description: 'The email of the user',
    example: 'user@example.com',
  })
  @IsEmail()
  readonly email?: string;
}

export class UpdatePasswordDto {
  @IsString()
  readonly password: string;
}
