import { faker } from '@faker-js/faker';
import { FactoryGirl } from 'factory-girl-ts';
import { User } from 'src/user/user.model';

export function defineUserFactory(factory: typeof FactoryGirl) {
  return factory.define(User, () => ({
    username: faker.internet.userName(),
    email: faker.internet.email({ firstName: 'incicle' }),
    password: faker.internet.password(),
    status: 'ACTIVE',
    type: faker.helpers.arrayElement(['PERSON', 'COMPANY']),
  }));
}
