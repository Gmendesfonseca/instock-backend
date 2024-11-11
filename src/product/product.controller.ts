import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Put,
  Logger,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductServiceInterface } from './interfaces/product.service.interface';

@Controller('/products')
export class ProductController {
  private readonly logger = new Logger(ProductController.name);

  constructor(
    private readonly productService: ProductServiceInterface.ProductService,
  ) {}

  @Post('/')
  create(@Body() createProductDto: CreateProductDto) {
    this.logger.debug('ProductController.create: Called');
    return this.productService.create(createProductDto);
  }

  @Get('/companies/:companyId')
  findAll(@Param('companyId', new ParseUUIDPipe()) companyId: string) {
    this.logger.debug('ProductController.findAll: Called');
    return this.productService.findAll(companyId);
  }

  @Get('/:id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    this.logger.debug('ProductController.findOne: Called');
    return this.productService.findOne(id);
  }

  @Put('/:id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    this.logger.debug('ProductController.update: Called');
    return this.productService.update(id, updateProductDto);
  }

  @Delete('/:id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    this.logger.debug('ProductController.remove: Called');
    return this.productService.destroy(id);
  }
}
