import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProjectDto {
  @ApiProperty({
    description: 'The name of the project',
    example: 'Project 1',
  })
  @IsString()
  readonly name: string;
  @ApiProperty({
    description: 'The status of the project',
    example: 'active',
  })
  @IsString()
  readonly status: string;
  @ApiProperty({
    description: 'The description of the project',
    example: 'This is a project',
  })
  @IsString()
  readonly description: string;
  @ApiProperty({
    description: 'The start date of the project',
    example: '2021-10-10T00:00:00.000Z',
  })
  @IsISO8601()
  readonly start_date: string;
  @ApiProperty({
    description: 'The end date of the project',
    example: '2021-10-10T00:00:00.000Z',
  })
  @IsISO8601()
  readonly end_date: string;
  @ApiProperty({
    description: 'The amount of the project',
    example: 1000,
  })
  @IsNumber()
  readonly amount: number;
  @ApiProperty({
    description: 'The client of the project',
    example: 'Client 1',
  })
  @IsOptional()
  readonly client: string;
}
