import { SetMetadata } from '@nestjs/common';

export const GroupUser = {
  COMPANY: 'COMPANY',
  PERSON: 'PERSON',
};

export const UserStatus = {
  ACTIVE: 'ACTIVE',
  BLOCKED: 'BLOCKED',
};

export const ProjectStatus = {
  ACTIVE: 'ACTIVE',
  CANCELED: 'CANCELED',
  FINISHED: 'FINISHED',
};

export type ProjectStatusType = keyof typeof ProjectStatus;

export const UnitMeasurement = {
  KG: 'KG',
  L: 'L',
  UNIT: 'UNIT',
};

export type UnitMeasurementType = keyof typeof UnitMeasurement;

export const statusTypes = {
  1: 'PENDING',
  2: 'IN_PROGRESS',
  3: 'ARCHIVED',
} as const;

export type StatusType = (typeof statusTypes)[keyof typeof statusTypes];

export const categoriesTypes = {
  1: 'COMPLAINT',
  2: 'INFORMATION',
  3: 'SUGGESTION',
  4: 'REPORT',
  5: 'PRAISE',
  6: 'OTHERS',
} as const;

export type CategoryType =
  (typeof categoriesTypes)[keyof typeof categoriesTypes];

export const viewedTypes = {
  1: 'SELF',
  2: 'COMPANY',
};

export type ViewedTypes = (typeof viewedTypes)[keyof typeof viewedTypes];

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
