import { UnitMeasurementType } from "src/utils/constants";
import { Product } from "../product.model";

export namespace ProductRepositoryInterface {
    export interface payloadProduct {
        id?: string;
        name: string;
        description: string;
        sale_price: number;
        purchase_price: number;
        quantity: number;
        unit_measurement: UnitMeasurementType;
    }

    export interface deleteProduct {
        id: string;
    }

    export abstract class ProductRepository {
        abstract findOne(id: string): Promise<Product | null>;
        abstract findAll(): Promise<Product[]>
        abstract create(payload: payloadProduct): Promise<Product>;
        abstract update(payload: payloadProduct): Promise<Product>;
        abstract destroy(id: string): Promise<void>;
    }
}