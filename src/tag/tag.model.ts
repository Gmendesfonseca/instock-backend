import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Company } from 'src/company/company.model';

@Table({
  tableName: 'in_stock_tags',
  underscored: true,
  paranoid: true,
  deletedAt: 'deletedAt',
})
export class Tag extends Model<Tag> {
  @Column({ primaryKey: true })
  rfid: string;

  // @ForeignKey(() => Product)
  // @Column
  productId: string;

  @ForeignKey(() => Company)
  @Column({ field: 'company_id', type: DataType.UUID })
  companyId: string;
}
