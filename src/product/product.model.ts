import { BelongsTo, Column, DataType, Model, Table } from 'sequelize-typescript';
import { Company } from 'src/company/company.model';
import { UnitMeasurement, UnitMeasurementType } from 'src/utils/constants';

@Table({ tableName: 'instock_products', underscored: true, paranoid: true })
export class Product extends Model<Product> {
    @Column({ type: DataType.UUID, primaryKey: true, autoIncrement: true })
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

    @Column({ type: DataType.ENUM, values: Object.values(UnitMeasurement) })
    unit_measurement: UnitMeasurementType;

    @BelongsTo(() => Company)
    company_id: string;
}