import {
  Column,
  DataType,
  HasMany,
  PrimaryKey,
  Table,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/user/user.model';

@Table({ tableName: 'companies', underscored: true, paranoid: true })
export class Company extends Model<Company> {
  @PrimaryKey
  @Column({ type: DataType.UUID })
  id: string;

  @Column
  name: string;

  @Column
  avatar: string | null;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  userId: string;

  @BelongsTo(() => User)
  user: User;
}
