import { faker } from '@faker-js/faker';
import { FactoryGirl } from 'factory-girl-ts';
import { Auth } from 'src/auth/auth.model';

export function defineAuthFactory(factory: typeof FactoryGirl) {
  return factory.define(Auth, () => ({
    email: faker.internet.email(),
    password: faker.internet.password(),
  }));
}
