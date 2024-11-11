import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Project } from 'src/project/project.model';
import { Product } from 'src/product/product.model';

@Table({
  tableName: 'in_stock_project_products',
  underscored: true,
  paranoid: true,
})
export class ProjectProduct extends Model<ProjectProduct> {
  @Column
  amount: number;

  @ForeignKey(() => Project)
  @Column({ type: DataType.UUID })
  project_id: string;

  @ForeignKey(() => Product)
  @Column({ type: DataType.UUID })
  product_id: string;
}
