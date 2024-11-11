import {
  IsISO8601,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { ProjectStatusType } from 'src/utils/constants';

export class CreateProjectDto {
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

export class ProductDto {
  @IsNumber()
  readonly amount: number;
  @IsNumber()
  readonly productId: string;
}

export class BodyDto {
  @IsObject()
  readonly data: CreateProjectDto;
  readonly items: ProductDto[];
}
