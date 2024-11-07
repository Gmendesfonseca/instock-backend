import { FactoryGirl, SequelizeAdapter } from 'factory-girl-ts';

import { defineUserFactory } from './user';
import { defineCompanyFactory } from './company';
import { definePersonFactory } from './person';
import { defineTagFactory } from './tag';
import { defineProjectFactory } from './project';
import { defineProductFactory } from './product';

FactoryGirl.setAdapter(new SequelizeAdapter());

const userFactory = defineUserFactory(FactoryGirl);
const companyFactory = defineCompanyFactory(FactoryGirl);
const personFactory = definePersonFactory(FactoryGirl);
const tagFactory = defineTagFactory(FactoryGirl);
const projectFactory = defineProjectFactory(FactoryGirl);
const productFactory = defineProductFactory(FactoryGirl);

export {
  userFactory,
  companyFactory,
  personFactory,
  tagFactory,
  projectFactory,
  productFactory,
};
