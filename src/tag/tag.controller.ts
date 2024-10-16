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

@Controller('/tag')
export class TagController {
  private readonly logger = new Logger(TagController.name);

  constructor(private readonly tagService: TagServiceInterface.TagService) {}

  @Get('/:rfid')
  @HttpCode(200)
  async findOne(@Param('rfid', new ParseUUIDPipe()) rfid: string) {
    this.logger.log('TagController.findOne: called');
    return this.tagService.findOne({ rfid });
  }

  @Get('/product/:product_id')
  @HttpCode(200)
  async findByProduct(
    @Param('product_id', new ParseUUIDPipe()) product_id: string,
  ) {
    this.logger.log('TagController.findByProduct: called');
    return this.tagService.findByProduct({ product_id });
  }

  @Get('/company/:company_id')
  @HttpCode(200)
  async findByCompany(
    @Param('company_id', new ParseUUIDPipe()) company_id: string,
  ) {
    this.logger.log('TagController.findByCompany: called');
    return this.tagService.findByCompany({ company_id });
  }

  @Post('/create')
  @HttpCode(201)
  async create(@Body() body: CreateTagDto) {
    this.logger.log('TagController.create: called');
    return this.tagService.create(body);
  }

  @Put('/:rfid')
  @HttpCode(204)
  async update(
    @Param('rfid', new ParseUUIDPipe()) rfid: string,
    @Body() product_id: string,
  ) {
    this.logger.log('TagController.update: called');
    return this.tagService.update({ rfid, product_id });
  }

  @Delete('/:rfid')
  @HttpCode(204)
  async delete(@Param('rfid', new ParseUUIDPipe()) rfid: string) {
    this.logger.log('TagController.delete: called');
    return this.tagService.delete(rfid);
  }
}
