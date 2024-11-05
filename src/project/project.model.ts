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

  @Column
  start_date: Date;

  @Column
  end_date: Date;

  @Column
  amount: number;

  @Column
  client: string;

  @ForeignKey(() => Company)
  @Column({ type: DataType.UUID })
  companyId: string;

  @BelongsTo(() => Company)
  company: Company;
}
