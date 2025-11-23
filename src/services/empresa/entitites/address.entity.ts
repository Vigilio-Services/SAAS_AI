import type { V } from "@config/server/const";
import { CityEntity } from "@services/ubigeo/entities/city.entity";
import { UserEntity } from "@services/user/entities/user.entity";
import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from "sequelize-typescript";
import { AddressSchema } from "../schemas/address.schema";
import { EmpresaEntity } from "./empresa.entity";

@Table({ tableName: "address" })
export class AddressEntity
    extends Model<AddressSchema, Omit<AddressSchema, "id">>
    implements AddressSchema
{
    declare id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    declare ubigeo: string;

    @Column({ type: DataType.STRING(1000), allowNull: false })
    declare urbanizacion: string;

    @Column({ type: DataType.STRING(1000), allowNull: false })
    declare direccion: string;

    @Column({ type: DataType.STRING(20), allowNull: false })
    declare cod_local: string;

    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
    declare enabled: boolean;

    /* ---------- RELACIONES ---------- */
    @ForeignKey(() => CityEntity)
    @Column({ type: DataType.INTEGER, allowNull: false })
    declare city_id: number;

    @BelongsTo(() => CityEntity)
    declare city: V<CityEntity>;

    @ForeignKey(() => UserEntity)
    @Column({ type: DataType.INTEGER, allowNull: false })
    declare user_id: number;

    @BelongsTo(() => UserEntity)
    declare user: V<UserEntity>;

    @ForeignKey(() => EmpresaEntity)
    @Column({ type: DataType.INTEGER, allowNull: false })
    declare empresa_id: number;

    @BelongsTo(() => EmpresaEntity)
    declare empresa: V<EmpresaEntity>;
}
