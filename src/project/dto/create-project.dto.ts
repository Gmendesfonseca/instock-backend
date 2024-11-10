import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsNumber, IsOptional, IsString } from 'class-validator';
import { ProjectStatusType } from 'src/utils/constants';

export class CreateProjectDto {
  @ApiProperty({})
  @IsString()
  readonly name: string;
  @IsString()
  readonly status: ProjectStatusType;
  @IsString()
  readonly description: string;
  @IsISO8601()
  readonly start_date: string;
  @IsISO8601()
  readonly end_date: string;
  @IsNumber()
  readonly amount: number;
  @IsOptional()
  readonly client: string;
}
