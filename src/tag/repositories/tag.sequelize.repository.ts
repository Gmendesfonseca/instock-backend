import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Tag } from '../tag.model';
import { TagRepositoryInterface } from '../interfaces/tag.repository.interface';

@Injectable()
export class TagSequelizeRepository
  implements TagRepositoryInterface.TagRepository
{
  private readonly logger = new Logger(TagSequelizeRepository.name);

  constructor(@InjectModel(Tag) private tagModel: typeof Tag) {}

  async findOne(rfid: string): Promise<Tag | null> {
    this.logger.debug('TagSequelizeRepository.findOne: called');
    return this.tagModel.findOne({
      where: { rfid },
      include: [Tag],
    });
  }

  async findByProduct(productId: string): Promise<Tag | null> {
    this.logger.debug('TagSequelizeRepository.findByProduct: called');
    return this.tagModel.findOne({
      where: { productId },
      include: [Tag],
    });
  }

  async findByCompany(companyId: string): Promise<Tag[] | null> {
    this.logger.debug('TagSequelizeRepository.findByCompany: called');
    return this.tagModel.findAll({
      where: { companyId },
      include: [Tag],
    });
  }

  async create({
    rfid,
    productId,
    companyId,
  }: TagRepositoryInterface.Inputs.Create): Promise<Tag> {
    this.logger.debug('TagSequelizeRepository.create: called');
    return this.tagModel.create({ rfid, productId, companyId });
  }

  async update({
    rfid,
    productId,
  }: TagRepositoryInterface.Inputs.Update): Promise<void> {
    this.logger.debug('TagSequelizeRepository.update: called');
    this.tagModel.update({ productId }, { where: { rfid } });
  }

  async delete(rfid: string): Promise<void> {
    this.logger.debug('TagSequelizeRepository.delete: called');
    this.tagModel.destroy({ where: { rfid } });
  }
}
