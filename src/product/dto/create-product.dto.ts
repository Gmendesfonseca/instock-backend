import { IsEnum, IsNumber, IsString } from "class-validator";
import { UnitMeasurement, UnitMeasurementType } from "src/utils/constants";

export class CreateProductDto {
    @IsString()
    name: string;
    @IsString()
    description: string;
    @IsNumber()
    sale_price: number;
    @IsNumber()
    purchase_price: number;
    @IsNumber()
    quantity: number;
    @IsEnum(UnitMeasurement)
    unit_measurement: UnitMeasurementType;
    @IsString()
    company_id: string
}
