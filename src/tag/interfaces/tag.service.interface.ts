export namespace TagServiceInterface {
  export namespace Inputs {
    export interface FindOne {
      rfid: string;
    }

    export interface FindByProduct {
      product_id: string;
    }

    export interface FindByCompany {
      company_id: string;
    }

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

  export abstract class TagService {
    abstract findOne(rfid: Inputs.FindOne): Promise<Outputs.Tag>;
    abstract findByProduct(
      product_id: Inputs.FindByProduct,
    ): Promise<Outputs.Tag>;
    abstract findByCompany(
      company_id: Inputs.FindByCompany,
    ): Promise<Outputs.Tag[]>;
    abstract create(body: Inputs.Create): Promise<Outputs.Tag>;
    abstract update({ rfid, product_id }: Inputs.Update): Promise<void>;
    abstract delete(rfid: string): Promise<void>;
  }
}
