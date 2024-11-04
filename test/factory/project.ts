import { faker } from '@faker-js/faker';
import { FactoryGirl } from 'factory-girl-ts';
import { Project } from 'src/project/project.model';

export function defineProjectFactory(factory: typeof FactoryGirl) {
  return factory.define(Project, () => ({
    id: faker.string.uuid(),
    name: faker.lorem.words(3),
    status: faker.helpers.arrayElement(['ACTIVE', 'FINISHED', 'CANCELED']),
    description: faker.lorem.sentence(),
    start_date: faker.date.past(),
    end_date: faker.date.future(),
    amount: faker.number.int(),
    client: faker.lorem.word(),
    company_id: faker.string.uuid(),
  }));
}
