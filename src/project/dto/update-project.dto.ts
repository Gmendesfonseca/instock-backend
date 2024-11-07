import { IsISO8601, IsNumber, IsString } from 'class-validator';

export class UpdateProjectDto {
  @IsString()
  readonly name: string;
  @IsString()
  readonly status: string;
  @IsString()
  readonly description: string;
  @IsISO8601()
  readonly start_date: string;
  @IsISO8601()
  readonly end_date: string;
  @IsNumber()
  readonly amount: number;
  @IsString()
  readonly client: string;
}
