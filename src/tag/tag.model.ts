import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Company } from 'src/company/company.model';
import { Product } from 'src/product/product.model';

@Table({
  tableName: 'in_stock_tags',
  underscored: true,
  paranoid: true,
  deletedAt: 'deletedAt',
})
export class Tag extends Model<Tag> {
  @Column({ primaryKey: true })
  rfid: string;

  @ForeignKey(() => Product)
  @Column({ type: DataType.UUID })
  product_id: string;

  @ForeignKey(() => Company)
  @Column({ type: DataType.UUID })
  company_id: string;

  @BelongsTo(() => Product)
  product: Product;
}
