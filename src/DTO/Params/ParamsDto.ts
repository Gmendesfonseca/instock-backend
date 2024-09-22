import { IsEmail, IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

export class ParamsDto {
  @IsUUID()
  readonly id: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

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
