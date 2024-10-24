export namespace TagServiceInterface {
  export namespace Inputs {
    export interface FindOne {
      rfid: string;
    }

    export interface FindByProduct {
      productId: string;
    }

    export interface FindByCompany {
      companyId: string;
    }

    export interface Create {
      rfid: string;
      productId: string;
      companyId: string;
    }

    export interface Update {
      rfid: string;
      productId: string;
    }
  }

  export namespace Outputs {
    export interface Tag {
      rfid: string;
      productId: string;
      companyId: string;
    }
  }

  export abstract class TagService {
    abstract findOne(rfid: Inputs.FindOne): Promise<Outputs.Tag>;
    abstract findByProduct(
      productId: Inputs.FindByProduct,
    ): Promise<Outputs.Tag>;
    abstract findByCompany(
      companyId: Inputs.FindByCompany,
    ): Promise<Outputs.Tag[]>;
    abstract create(body: Inputs.Create): Promise<Outputs.Tag>;
    abstract update({ rfid, productId }: Inputs.Update): Promise<void>;
    abstract delete(rfid: string): Promise<void>;
  }
}
