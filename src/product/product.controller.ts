import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductServiceInterface } from './interfaces/product.service.interface';

@Controller('/products')
export class ProductController {
  constructor(
    private readonly productService: ProductServiceInterface.ProductService,
  ) {}

  @Post('/')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get('/companies/:companyId')
  findAll(@Param('companyId', new ParseUUIDPipe()) companyId: string) {
    return this.productService.findAll(companyId);
  }

  @Get('/:id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.productService.findOne(id);
  }

  @Put('/:id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete('/:id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.productService.destroy(id);
  }
}
