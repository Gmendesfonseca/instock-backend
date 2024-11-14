import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTagDto {
  @ApiProperty({
    description: 'The RFID of the tag',
    example: '1234567890',
  })
  @IsString()
  readonly rfid: string;
  @ApiProperty({
    description: 'The ID of the product',
    example: 'product123',
  })
  @IsString()
  readonly product_id: string;
  @ApiProperty({
    description: 'The ID of the company',
    example: 'company123',
  })
  @IsString()
  readonly company_id: string;
}
