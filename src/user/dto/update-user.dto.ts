import { IsEmail, IsEnum, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  readonly username?: string;

  @IsEmail()
  readonly email?: string;
}

export class UpdatePasswordDto {
  @IsString()
  readonly password: string;
}

export class UpdateStatus {
  @IsEnum(['ACTIVE', 'BLOCKED'])
  readonly status: string;
}
