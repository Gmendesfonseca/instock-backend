import { UnitMeasurementType } from "src/utils/constants";
import { Product } from "../product.model";

export namespace ProductRepositoryInterface {
    export interface payloadProduct {
        name: string;
        description: string;
        sale_price: number;
        purchase_price: number;
        quantity: number;
        unit_measurement: UnitMeasurementType;
        company_id: string
    }

    export interface deleteProduct {
        id: string;
    }

    export abstract class ProductRepository {
        abstract findOne(id: string): Promise<Product | null>;
        abstract findAll(companyId: string): Promise<Product[]>
        abstract create(payload: payloadProduct): Promise<Product>;
        abstract update(product: Product, payload: payloadProduct): Promise<Product>;
        abstract destroy(id: string): Promise<void>;
    }
}