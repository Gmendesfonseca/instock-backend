import { IsEmail, IsInt, IsOptional, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;
}

export class PaginationDto {
  @IsOptional()
  @IsString()
  readonly search?: string;

  @IsOptional()
  @IsInt()
  readonly page?: number;

  @IsOptional()
  @IsInt()
  readonly limit?: number;
}
