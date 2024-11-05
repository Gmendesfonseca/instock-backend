import { FactoryGirl } from 'factory-girl-ts';
import { Product } from 'src/product/product.model';
import { faker } from '@faker-js/faker';

export function defineProductFactory(factory: typeof FactoryGirl) {
  return factory.define(Product, () => ({
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    stock: faker.number.int(),
    image: faker.image.avatar(),
  }));
}
