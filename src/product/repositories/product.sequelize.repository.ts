import { Injectable } from "@nestjs/common";
import { Product } from "../product.model";
import { ProductRepositoryInterface } from "../interfaces/product.repository.interface";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class ProductSequelizeRepository implements ProductRepositoryInterface.ProductRepository {
    constructor(@InjectModel(Product) private productModel: typeof Product) { }

    async findOne(id: string): Promise<Product> {
        return await this.productModel.findOne({ where: { id } });
    }

    async findAll(companyId: string): Promise<Product[]> {
        return await this.productModel.findAll({ where: { company_id: companyId } });
    }

    async create(payload: ProductRepositoryInterface.Inputs.payloadProduct): Promise<Product> {
        return await this.productModel.create(payload);
    }

    async update(product: Product, payload: ProductRepositoryInterface.Inputs.payloadProduct): Promise<Product> {
        product.update(payload);
        return await product.save();
    }

    async destroy(id: string): Promise<void> {
        await this.productModel.destroy({ where: { id } });
    }
}