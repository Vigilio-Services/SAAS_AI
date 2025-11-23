import type { V } from "@config/server/const";
import { FilesSchema } from "@services/uploads/schemas/uploads.schema";
import { UserEntity } from "@services/user/entities/user.entity";
import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from "sequelize-typescript";
import { MetodoPagoSchema } from "../schemas/metodo_pago.schema";
import { EmpresaEntity } from "./empresa.entity";

@Table({ tableName: "metodo_pago", timestamps: false })
export class MetodoPagoEntity
    extends Model<MetodoPagoSchema, Omit<MetodoPagoSchema, "id">>
    implements MetodoPagoSchema
{
    declare id: number;

    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
    declare enabled_efectivo: boolean;

    @Column({ type: DataType.JSON, allowNull: true })
    declare paypal: MetodoPagoSchema["paypal"];

    @Column({ type: DataType.JSON, allowNull: true })
    declare mercado_pago: MetodoPagoSchema["mercado_pago"];

    @Column({ type: DataType.JSON, allowNull: true })
    declare qr_yape: FilesSchema[] | null;

    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
    declare qr_yape_enabled: boolean;

    @Column({ type: DataType.JSON, allowNull: true })
    declare qr_plin: FilesSchema[] | null;

    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
    declare qr_plin_enabled: boolean;

    @Column({ type: DataType.JSON, allowNull: true })
    declare transferencias: MetodoPagoSchema["transferencias"];

    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
    declare transferencias_enabled: boolean;

    @Column({ type: DataType.JSON, allowNull: true })
    declare izipay: MetodoPagoSchema["izipay"];

    @Column({ type: DataType.JSON, allowNull: true })
    declare stripe: MetodoPagoSchema["stripe"];

    @Column({ type: DataType.JSON, allowNull: true })
    declare niubiz: MetodoPagoSchema["niubiz"];

    /* ---------- RELACIONES ---------- */
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
