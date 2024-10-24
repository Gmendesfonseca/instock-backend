import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  readonly name: string;
  @IsString()
  readonly status: string;
  @IsString()
  readonly description: string;
  @IsDate()
  readonly start_date: Date;
  @IsDate()
  readonly end_date: Date;
  @IsNumber()
  readonly amount: number;
  @IsString()
  readonly client: string;
}
