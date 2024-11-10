import {
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
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
    newProduct: ProductRepositoryInterface.Inputs.payloadProduct,
  ): Promise<Product> {
    this.logger.debug('ProductSequelizeRepository.create: Called');
    const product = await this.productModel.findOne({
      where: { name: newProduct.name },
    });
    if (product) {
      throw new UnprocessableEntityException(
        'Another product with this name already exists',
      );
    }
    return await this.productModel.create(newProduct);
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
