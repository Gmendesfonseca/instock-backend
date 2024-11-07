import { IsEmail, IsEnum, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  readonly email: string;
  @IsString()
  readonly password: string;
  @IsString()
  readonly username: string;
  @IsEnum(['PERSON', 'COMPANY'])
  readonly type: string;
}
