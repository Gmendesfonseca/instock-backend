import { IsEmail, IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

export class IdDto {
  @IsUUID()
  readonly id: string;
}

export class LoginDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;
}

@IsOptional()
@IsString()
readonly search?: string;

@IsOptional()
@IsInt()
readonly page?: number;

@IsOptional()
@IsInt()
readonly limit?: number;
