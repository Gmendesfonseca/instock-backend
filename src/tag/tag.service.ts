import { Injectable, Logger } from '@nestjs/common';
import { TagRepositoryInterface } from './interfaces/tag.repository.interface';
import { TagServiceInterface } from './interfaces/tag.service.interface';

@Injectable()
export class TagService implements TagServiceInterface.TagService {
  private readonly logger = new Logger(TagService.name);

  constructor(
    private readonly tagRepository: TagRepositoryInterface.TagRepository,
  ) {}

  async findOne({
    rfid,
  }: TagServiceInterface.Inputs.FindOne): Promise<TagServiceInterface.Outputs.Tag> {
    this.logger.log('TagService.findOne: called');
    return this.tagRepository.findOne(rfid);
  }
  async findByProduct({
    product_id,
  }: TagServiceInterface.Inputs.FindByProduct): Promise<TagServiceInterface.Outputs.Tag> {
    this.logger.log('TagService.findByProduct: called');
    return this.tagRepository.findByProduct(product_id);
  }

  async findByCompany({
    company_id,
  }: TagServiceInterface.Inputs.FindByCompany): Promise<
    TagServiceInterface.Outputs.Tag[]
  > {
    this.logger.log('TagService.findByCompany: called');
    return this.tagRepository.findByCompany(company_id);
  }

  async create({
    rfid,
    product_id,
    company_id,
  }: TagServiceInterface.Inputs.Create): Promise<TagServiceInterface.Outputs.Tag> {
    this.logger.log('TagService.create: called');
    return this.tagRepository.create({ rfid, product_id, company_id });
  }

  async update({
    rfid,
    product_id,
  }: TagServiceInterface.Inputs.Update): Promise<void> {
    this.logger.log('TagService.update: called');
    return this.tagRepository.update({ rfid, product_id });
  }

  async delete(rfid: string): Promise<void> {
    this.logger.log('TagService.delete: called');
    return this.tagRepository.delete(rfid);
  }
}
