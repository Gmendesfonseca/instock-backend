import { IsString } from 'class-validator';

export class CreateTagDto {
  @IsString()
  readonly rfid: string;
  @IsString()
  readonly productId: string;
  @IsString()
  readonly companyId: string;
}
