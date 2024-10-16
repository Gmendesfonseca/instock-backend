import { faker } from '@faker-js/faker';
import { FactoryGirl } from 'factory-girl-ts';
import { Tag } from 'src/tag/tag.model';

export function defineTagFactory(factory: typeof FactoryGirl) {
  return factory.define(Tag, () => ({
    rfid: faker.string.uuid(),
    product_id: faker.string.uuid(),
    company_id: faker.string.uuid(),
  }));
}
