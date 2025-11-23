import type { V } from "@config/server/const";
import {
    Column,
    DataType,
    HasMany,
    Model,
    Table,
    Unique,
} from "sequelize-typescript";
import { CountrySchema } from "../schemas/country.schema";
import { RegionEntity } from "./region.entity";

@Table({ timestamps: false, tableName: "country" })
export class CountryEntity extends Model implements Omit<CountrySchema, "id"> {
    @Unique
    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    declare code: string;

    @Unique
    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    declare dial_code: CountrySchema["dial_code"];

    @Unique
    @Column({
        allowNull: false,
        type: DataType.STRING(255),
    })
    declare name: string;

    @HasMany(() => RegionEntity)
    declare regions: V<RegionEntity>[];
}
