import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Logger,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TagServiceInterface } from './interfaces/tag.service.interface';
import { CreateTagDto } from './dto/create-tag.dto';

@Controller('/tags')
export class TagController {
  private readonly logger = new Logger(TagController.name);

  constructor(private readonly tagService: TagServiceInterface.TagService) {}

  @Get('/:rfid')
  @HttpCode(200)
  async findOne(@Param() rfid: string) {
    this.logger.log('TagController.findOne: called');
    return this.tagService.findOne({ rfid });
  }

  @Get('/products/:product_id')
  @HttpCode(200)
  async findByProduct(
    @Param('product_id', new ParseUUIDPipe()) productId: string,
  ) {
    this.logger.log('TagController.findByProduct: called');
    return this.tagService.findByProduct({ productId });
  }

  @Get('/companies/:company_id')
  @HttpCode(200)
  async findByCompany(
    @Param('company_id', new ParseUUIDPipe()) companyId: string,
  ) {
    this.logger.log('TagController.findByCompany: called');
    return this.tagService.findByCompany({ companyId });
  }

  @Post('/')
  @HttpCode(201)
  async create(@Body() { company_id, product_id, rfid }: CreateTagDto) {
    this.logger.log('TagController.create: called');
    return this.tagService.create({
      companyId: company_id,
      productId: product_id,
      rfid,
    });
  }

  @Put('/:rfid')
  @HttpCode(204)
  async update(
    @Param('rfid', new ParseUUIDPipe()) rfid: string,
    @Body() productId: string,
  ) {
    this.logger.log('TagController.update: called');
    return this.tagService.update({ rfid, productId });
  }

  @Delete('/:rfid')
  @HttpCode(204)
  async delete(@Param('rfid', new ParseUUIDPipe()) rfid: string) {
    this.logger.log('TagController.delete: called');
    return this.tagService.delete(rfid);
  }
}
