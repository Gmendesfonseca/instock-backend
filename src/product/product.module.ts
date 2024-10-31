import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './product.model';
import { ProductServiceInterface } from './interfaces/product.service.interface';
import { ProductRepositoryInterface } from './interfaces/product.repository.interface';
import { ProductSequelizeRepository } from './repositories/product.sequelize.repository';

@Module({
  imports: [SequelizeModule.forFeature([Product])],
  providers: [{
    provide: ProductServiceInterface.ProductService,
    useClass: ProductService,
  },
  {
    provide: ProductRepositoryInterface.ProductRepository,
    useClass: ProductSequelizeRepository,
  }],
  controllers: [ProductController],
  exports: [ProductRepositoryInterface.ProductRepository],
})
export class ProductModule { }