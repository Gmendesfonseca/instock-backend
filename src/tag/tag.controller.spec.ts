import { tagFactory } from 'test/factory';
import { TagServiceInterface } from './interfaces/tag.service.interface';
import { TagController } from './tag.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('TagController', () => {
  let controller: TagController;
  let service: TagServiceInterface.TagService;
  const rfid = '1234567890';
  const product_id = '1234567890';
  const company_id = '1234567890';
  const tag = tagFactory.create({
    rfid: '1234567890',
    product_id: '1234567890',
    company_id: '1234567890',
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagController],
      providers: [
        {
          provide: TagServiceInterface.TagService,
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

    controller = module.get<TagController>(TagController);
    service = module.get<TagServiceInterface.TagService>(
      TagServiceInterface.TagService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should find a tag by findOne', async () => {
    expect(await controller.findOne(rfid)).toEqual(tag);
  });

  it('should find a tag by findByProduct', async () => {
    expect(await controller.findByProduct(product_id)).toEqual(tag);
  });

  it('should find a tag by findByCompany', async () => {
    expect(await controller.findByCompany(company_id)).toEqual([tag]);
  });

  it('should create a tag', async () => {
    expect(
      await controller.create({
        rfid: rfid,
        product_id: product_id,
        company_id: company_id,
      }),
    ).toEqual(tag);
  });
});
