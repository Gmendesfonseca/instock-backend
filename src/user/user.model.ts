import { Column, DataType, HasOne, Model, Table } from 'sequelize-typescript';
import { Company } from 'src/company/company.model';
import { Person } from 'src/person/person.model';

@Table({ tableName: 'users', underscored: true, paranoid: true })
export class User extends Model<User> {
  @Column({ type: DataType.UUID, primaryKey: true, autoIncrement: true })
  id: string;

  @Column({ unique: true })
  email: string;

  @Column
  password: string;

  @Column({ allowNull: false, unique: true })
  username: string;

  @Column({ type: DataType.ENUM('ACTIVE', 'BLOCKED') })
  status: string;

  @Column({ type: DataType.ENUM('COMPANY', 'PERSON') })
  type: string;

  @Column({ type: DataType.BOOLEAN })
  isVerified: boolean;

  @HasOne(() => Company)
  company: Company;

  @HasOne(() => Person)
  person: Person;
}
