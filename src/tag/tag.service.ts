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
    productId,
  }: TagServiceInterface.Inputs.FindByProduct): Promise<TagServiceInterface.Outputs.Tag> {
    this.logger.log('TagService.findByProduct: called');
    return this.tagRepository.findByProduct(productId);
  }

  async findByCompany({
    companyId,
  }: TagServiceInterface.Inputs.FindByCompany): Promise<
    TagServiceInterface.Outputs.Tag[]
  > {
    this.logger.log('TagService.findByCompany: called');
    return this.tagRepository.findByCompany(companyId);
  }

  async create({
    rfid,
    productId,
    companyId,
  }: TagServiceInterface.Inputs.Create): Promise<TagServiceInterface.Outputs.Tag> {
    this.logger.log('TagService.create: called');
    return this.tagRepository.create({ rfid, productId, companyId });
  }

  async update({
    rfid,
    productId,
  }: TagServiceInterface.Inputs.Update): Promise<void> {
    this.logger.log('TagService.update: called');
    return this.tagRepository.update({ rfid, productId });
  }

  async delete(rfid: string): Promise<void> {
    this.logger.log('TagService.delete: called');
    return this.tagRepository.delete(rfid);
  }
}
