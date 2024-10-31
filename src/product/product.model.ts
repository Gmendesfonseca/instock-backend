import { Column, DataType, HasOne, Model, Table } from 'sequelize-typescript';
import { UnitMeasurementType } from 'src/utils/constants';

@Table({ tableName: 'users', underscored: true, paranoid: true })
export class Product extends Model<Product> {
    @Column({ type: DataType.UUID, primaryKey: true })
    id: string;

    @Column
    name: string;

    @Column
    description: string;

    @Column
    purchase_price: number;

    @Column
    sale_price: number;

    @Column
    quantity: number;

    @Column
    unit_measurement: UnitMeasurementType;

    // @Column
    // status: string;

    // @HasOne(() => Category)
    // category: Category;
}