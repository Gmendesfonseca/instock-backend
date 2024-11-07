import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ProductServiceInterface } from './interfaces/product.service.interface';
import { ProductRepositoryInterface } from './interfaces/product.repository.interface';

@Injectable()
export class ProductService implements ProductServiceInterface.ProductService {
  private readonly logger = new Logger(ProductService.name);

  constructor(
    private readonly productRepository: ProductRepositoryInterface.ProductRepository,
  ) {}

  async findOne(
    id: string,
  ): Promise<ProductServiceInterface.Outputs.Product | null> {
    this.logger.debug('ProductService.findOne: Called');
    return this.productRepository.findOne(id);
  }

  async findAll(
    companyId: string,
  ): Promise<ProductServiceInterface.Outputs.Product[] | null> {
    this.logger.debug('ProductService.findAll: Called');
    return this.productRepository.findAll(companyId);
  }

  async create(
    payload: ProductServiceInterface.Inputs.createProduct,
  ): Promise<ProductServiceInterface.Outputs.Product> {
    this.logger.debug('ProductService.create: Called');
    return this.productRepository.create(payload);
  }

  async update(
    id: string,
    payload: ProductServiceInterface.Inputs.updateProduct,
  ): Promise<ProductServiceInterface.Outputs.Product> {
    this.logger.debug('ProductService.update: Called');
    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new NotFoundException();
    }
    return this.productRepository.update(product, payload);
  }

  async destroy(id: string) {
    this.logger.debug('ProductService.destroy: Called');
    return this.productRepository.destroy(id);
  }
}
