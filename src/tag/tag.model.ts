import { Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'instock_tags',
  underscored: true,
  paranoid: true,
  deletedAt: 'deletedAt',
})
export class Tag extends Model<Tag> {
  rfid: string;
  productId: string;
  companyId: string;
}
