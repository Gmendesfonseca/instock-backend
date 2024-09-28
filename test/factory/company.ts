import { faker } from '@faker-js/faker';
import { FactoryGirl } from 'factory-girl-ts';
import { Company } from 'src/company/company.model';
export function defineCompanyFactory(factory: typeof FactoryGirl) {
  return factory.define(Company, () => ({
    name: faker.company.name(),
    avatar: faker.image.avatar(),
  }));
}
