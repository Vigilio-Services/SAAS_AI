import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from "sequelize-typescript";
import { EmpresaServiceSchema } from "../schemas/empresa_service.schema";
import { EmpresaEntity } from "./empresa.entity";

@Table({ tableName: "empresa_service", timestamps: false })
export class EmpresaServiceEntity
    extends Model<EmpresaServiceSchema, Omit<EmpresaServiceSchema, "id">>
    implements EmpresaServiceSchema
{
    declare id: number;

    @Column({ type: DataType.STRING(255), allowNull: false })
    declare groq_ai_token: string;

    @Column({ type: DataType.JSON, allowNull: true })
    declare cuota_web: EmpresaServiceSchema["cuota_web"];

    @Column({ type: DataType.JSON, allowNull: true })
    declare cuota_chat: EmpresaServiceSchema["cuota_chat"];

    @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
    declare tokens: number;

    @Column({ type: DataType.JSON, allowNull: true })
    declare facturacion: EmpresaServiceSchema["facturacion"];

    /* ---------- RELACIONES ---------- */

    @ForeignKey(() => EmpresaEntity)
    @Column({ type: DataType.INTEGER, allowNull: false })
    declare empresa_id: number;

    @BelongsTo(() => EmpresaEntity)
    declare empresa: EmpresaEntity;
}
