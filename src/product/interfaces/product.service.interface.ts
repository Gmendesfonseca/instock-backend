import { UnitMeasurementType } from 'src/utils/constants';

export namespace ProductServiceInterface {
    export namespace Inputs {
        export interface createProduct {
            name: string;
            description: string;
            purchase_price: number;
            sale_price: number;
            quantity: number;
            unit_measurement: UnitMeasurementType;
        }

        export interface updateProduct {
            id: string;
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
    }

    export namespace Outputs {
        export interface Product {
            id: string;
            name: string;
            description: string;
            purchase_price: number;
            sale_price: number;
            quantity: number;
            unit_measurement: UnitMeasurementType;
        }
    }

    export abstract class ProductService {
        abstract findOne(id: string): Promise<Outputs.Product | null>;
        abstract findAll(): Promise<Outputs.Product[]>
        abstract create(product: Inputs.createProduct): Promise<Outputs.Product>;
        abstract update(product: Inputs.updateProduct): Promise<Outputs.Product>;
        abstract destroy(id: string): Promise<void>;
    }
}
