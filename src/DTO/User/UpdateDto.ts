import { IsEmail, IsString } from 'class-validator';

export class UpdateUser {
  @IsString()
  readonly firstName?: string;
  @IsString()
  readonly lastName?: string;
}
