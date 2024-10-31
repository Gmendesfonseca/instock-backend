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

    async findAll(): Promise<Product[]> {
        return await this.productModel.findAll();
    }

    async create(payload: ProductRepositoryInterface.payloadProduct): Promise<Product> {
        return await this.productModel.create(payload);
    }

    async update(payload: ProductRepositoryInterface.payloadProduct): Promise<Product> {
        const product = await this.findOne(payload.id);
        product.name = payload.name;
        product.description = payload.description;
        product.purchase_price = payload.purchase_price;
        product.sale_price = payload.sale_price;
        product.quantity = payload.quantity;
        product.unit_measurement = payload.unit_measurement;
        return await product.save();
    }

    async destroy(id: string): Promise<void> {
        await this.productModel.destroy({ where: { id } });
    }
}