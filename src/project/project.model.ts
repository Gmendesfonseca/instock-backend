import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Company } from 'src/company/company.model';
import { ProjectStatus } from 'src/utils/constants';

@Table({ tableName: 'in_stock_projects', underscored: true, paranoid: true })
export class Project extends Model<Project> {
  @Column({ type: DataType.UUID, primaryKey: true, autoIncrement: true })
  id: string;

  @Column
  name: string;

  @Column({ type: DataType.ENUM, values: Object.values(ProjectStatus) })
  status: string;

  @Column
  description: string;

  @Column({ type: DataType.DATE })
  start_date: string;

  @Column({ type: DataType.DATE })
  end_date: string;

  @Column
  amount: number;

  @Column
  client: string;

  @ForeignKey(() => Company)
  @Column({ type: DataType.UUID })
  company_id: string;

  @BelongsTo(() => Company)
  company: Company;
}
