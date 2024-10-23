import { Column, DataType, HasOne, Model, Table } from 'sequelize-typescript';
import { Company } from 'src/company/company.model';

@Table({ tableName: 'instock_projects', underscored: true, paranoid: true })
export class Project extends Model<Project> {
  @Column({ type: DataType.UUID, primaryKey: true })
  id: string;

  @Column
  name: string;

  @Column
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

  @HasOne(() => Company)
  company: Company;
}
