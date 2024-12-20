import { UnitMeasurementType } from 'src/utils/constants';
import { Product } from '../product.model';

export namespace ProductRepositoryInterface {
  export namespace Inputs {
    export interface payloadProduct {
      name: string;
      description: string;
      purchase_price: number;
      quantity: number;
      unit_measurement: string;
      company_id: string;
    }
  }

  export abstract class ProductRepository {
    abstract findOne(id: string): Promise<Product | null>;
    abstract findAll(companyId: string): Promise<Product[] | null>;
    abstract create(payload: Inputs.payloadProduct): Promise<Product>;
    abstract update(
      product: Product,
      payload: Inputs.payloadProduct,
    ): Promise<Product>;
    abstract destroy(id: string): Promise<void>;
  }
}
