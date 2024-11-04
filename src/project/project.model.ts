import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Company } from 'src/company/company.model';

@Table({ tableName: 'in_stock_projects', underscored: true, paranoid: true })
export class Project extends Model<Project> {
  @Column({ type: DataType.UUID, primaryKey: true, autoIncrement: true })
  id: string;

  @Column
  name: string;

  @Column({ type: DataType.ENUM('ACTIVE', 'CANCELED', 'FINISHED') })
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
