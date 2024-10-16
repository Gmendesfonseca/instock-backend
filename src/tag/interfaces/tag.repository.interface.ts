export namespace TagRepositoryInterface {
  export namespace Inputs {
    export interface Create {
      rfid: string;
      product_id: string;
      company_id: string;
    }

    export interface Update {
      rfid: string;
      product_id: string;
    }
  }

  export namespace Outputs {
    export interface Tag {
      rfid: string;
      product_id: string;
      company_id: string;
    }
  }

  export abstract class TagRepository {
    abstract findOne(rfid: string): Promise<Outputs.Tag>;
    abstract findByProduct(product_id: string): Promise<Outputs.Tag>;
    abstract findByCompany(company_id: string): Promise<Outputs.Tag[]>;
    abstract create({
      rfid,
      product_id,
      company_id,
    }: Inputs.Create): Promise<Outputs.Tag>;
    abstract update({ rfid, product_id }: Inputs.Update): Promise<void>;
    abstract delete(rfid: string): Promise<void>;
  }
}
