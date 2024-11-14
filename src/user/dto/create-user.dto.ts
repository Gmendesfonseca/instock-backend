import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString } from 'class-validator';

export class CreateUserDto {
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
  @ApiProperty({
    description: 'The username of the user',
    example: 'user',
  })
  @IsString()
  readonly username: string;
  @ApiProperty({
    description: 'The type of the user',
    example: 'PERSON',
  })
  @IsEnum(['PERSON', 'COMPANY'])
  readonly type: string;
}
