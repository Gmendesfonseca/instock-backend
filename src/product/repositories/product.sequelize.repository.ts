import { Injectable, Logger } from '@nestjs/common';
import { Product } from '../product.model';
import { ProductRepositoryInterface } from '../interfaces/product.repository.interface';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ProductSequelizeRepository
  implements ProductRepositoryInterface.ProductRepository
{
  private readonly logger = new Logger(ProductSequelizeRepository.name);

  constructor(@InjectModel(Product) private productModel: typeof Product) {}

  async findOne(id: string): Promise<Product> {
    this.logger.debug('ProductSequelizeRepository.findOne: Called');
    return await this.productModel.findOne({ where: { id } });
  }

  async findAll(companyId: string): Promise<Product[]> {
    this.logger.debug('ProductSequelizeRepository.findAll: Called');
    return await this.productModel.findAll({ where: { companyId: companyId } });
  }

  async create(
    payload: ProductRepositoryInterface.Inputs.payloadProduct,
  ): Promise<Product> {
    this.logger.debug('ProductSequelizeRepository.create: Called');
    return await this.productModel.create(payload);
  }

  async update(
    product: Product,
    payload: ProductRepositoryInterface.Inputs.payloadProduct,
  ): Promise<Product> {
    this.logger.debug('ProductSequelizeRepository.update: Called');
    product.update(payload);
    return await product.save();
  }

  async destroy(id: string): Promise<void> {
    this.logger.debug('ProductSequelizeRepository.delete: Called');
    await this.productModel.destroy({ where: { id } });
  }
}
