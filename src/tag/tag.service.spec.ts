import { Test } from '@nestjs/testing';
import { TagServiceInterface } from './interfaces/tag.service.interface';
import { Tag } from './tag.model';
import { TagService } from './tag.service';
import { getModelToken } from '@nestjs/sequelize';
import { tagFactory } from 'test/factory';

describe('TagService', () => {
  let service: TagServiceInterface.TagService;
  let model: typeof Tag;
  const rfid = '1234567890';
  const product_id = '1234567890';
  const company_id = '1234567890';
  const tag = tagFactory.create({
    rfid: '1234567890',
    product_id: '1234567890',
    company_id: '1234567890',
  });

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TagService,
        {
          provide: getModelToken(Tag),
          useValue: {
            findOne: jest.fn(() => tag),
            findByProduct: jest.fn(() => tag),
            findByCompany: jest.fn(() => [tag]),
            create: jest.fn(() => tag),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();
    service = module.get<TagService>(TagService);
    model = module.get<typeof Tag>(getModelToken(Tag));
  });

  it('should find a tag by findOne', async () => {
    expect(await service.findOne({ rfid: rfid })).toEqual(tag);
  });

  it('should find a tag by findByProduct', async () => {
    expect(await service.findByProduct({ product_id: product_id })).toEqual(
      tag,
    );
  });

  it('should find a tag by findByCompany', async () => {
    expect(await service.findByCompany({ company_id: company_id })).toEqual([
      tag,
    ]);
  });

  it('should create a tag', async () => {
    expect(
      await service.create({
        rfid: rfid,
        product_id: product_id,
        company_id: company_id,
      }),
    ).toEqual(tag);
  });

  it('should update a tag', async () => {
    await service.update({ rfid: rfid, product_id: product_id });
    expect(model.update).toHaveBeenCalledWith(
      { product_id },
      { where: { rfid } },
    );
  });

  it('should delete a tag', async () => {
    await service.delete(rfid);
    expect(model.destroy).toHaveBeenCalledWith({ where: { rfid } });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
