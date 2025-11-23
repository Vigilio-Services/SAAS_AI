import type { V } from "@config/server/const";
import { UserEntity } from "@services/user/entities/user.entity";
import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from "sequelize-typescript";
import { EmpresaPaymentSchema } from "../schemas/empresa_payment.schema";
import { EmpresaEntity } from "./empresa.entity";

@Table({ tableName: "empresa_payment", timestamps: false })
export class EmpresaPaymentEntity
    extends Model<EmpresaPaymentSchema, Omit<EmpresaPaymentSchema, "id">>
    implements EmpresaPaymentSchema
{
    declare id: number;

    @Column({ type: DataType.STRING(10), allowNull: false })
    declare tipo_impuesto: string;

    @Column({ type: DataType.JSON, allowNull: false })
    declare money: EmpresaPaymentSchema["money"];

    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
    declare enabled_igv: boolean;

    @Column({ type: DataType.FLOAT, allowNull: false })
    declare igv: number;

    @Column({ type: DataType.JSON, allowNull: false })
    declare bancos: EmpresaPaymentSchema["bancos"];

    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
    declare is_dolar: boolean;

    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
    declare enabled_dni_cart: boolean;

    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
    declare enabled_client_pay_comision: boolean;

    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
    declare enabled_sell_country: boolean;

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
