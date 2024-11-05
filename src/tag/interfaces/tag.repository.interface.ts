import { Tag } from '../tag.model';

export namespace TagRepositoryInterface {
  export namespace Inputs {
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

  export abstract class TagRepository {
    abstract findOne(rfid: string): Promise<Tag | null>;
    abstract findByProduct(productId: string): Promise<Tag | null>;
    abstract findByCompany(companyId: string): Promise<Tag[] | null>;
    abstract create({
      rfid,
      productId,
      companyId,
    }: Inputs.Create): Promise<Tag>;
    abstract update({ rfid, productId }: Inputs.Update): Promise<void>;
    abstract delete(rfid: string): Promise<void>;
  }
}
