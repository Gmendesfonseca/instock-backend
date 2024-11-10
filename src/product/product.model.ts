import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Company } from 'src/company/company.model';
import { ProjectProduct } from 'src/project-product/product-project.model';
import { Project } from 'src/project/project.model';
import { UnitMeasurement, UnitMeasurementType } from 'src/utils/constants';

@Table({ tableName: 'in_stock_products', underscored: true, paranoid: true })
export class Product extends Model<Product> {
  @Column({ type: DataType.UUID, primaryKey: true, autoIncrement: true })
  id: string;

  @Column
  name: string;

  @Column
  description: string;

  @Column
  purchase_price: number;

  @Column
  quantity: number;

  @Column({ type: DataType.ENUM, values: Object.values(UnitMeasurement) })
  unit_measurement: string;

  @ForeignKey(() => Company)
  @Column({ type: DataType.UUID })
  companyId: string;

  @BelongsTo(() => Company)
  company: Company;

  @BelongsToMany(() => Project, () => ProjectProduct)
  projects: Project[];
}
