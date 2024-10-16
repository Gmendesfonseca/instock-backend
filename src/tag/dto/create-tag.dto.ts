import { IsString } from 'class-validator';

export class CreateTagDto {
  @IsString()
  readonly rfid: string;
  @IsString()
  readonly product_id: string;
  @IsString()
  readonly company_id: string;
}
