import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNumber, IsString } from 'class-validator';
import { UnitMeasurement, UnitMeasurementType } from 'src/utils/constants';

export class CreateProductDto {
  @ApiProperty({
    description: 'The name of the product',
    example: 'Product 1',
  })
  @IsString()
  name: string;
  @ApiProperty({
    description: 'The description of the product',
    example: 'This is a product',
  })
  @IsString()
  description: string;
  @ApiProperty({
    description: 'The purchase price of the product',
    example: 50.0,
  })
  @IsNumber()
  purchase_price: number;
  @ApiProperty({
    description: 'The quantity of the product',
    example: 10,
  })
  @IsInt()
  quantity: number;
  @ApiProperty({
    description: 'The unit measurement of the product',
    example: 'unit',
  })
  @IsEnum(UnitMeasurement)
  unit_measurement: UnitMeasurementType;
  @ApiProperty({
    description: 'The company ID of the product',
    example: 'c3b3b3b3-3b3b-3b3b-3b3b-3b3b3b3b3b3b',
  })
  @IsString()
  company_id: string;
}
