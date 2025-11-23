import type { V } from "@config/server/const";
import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    HasOne,
    Model,
    Table,
} from "sequelize-typescript";
import type { TipoEmpresaSchema } from "../schemas/tipo_empresa.schema";
import { EmpresaEntity } from "./empresa.entity";
import { TipoServicioEntity } from "./tipo_servicio.entity";

@Table({ tableName: "tipo_empresa", timestamps: true })
export class TipoEmpresaEntity
    extends Model<TipoEmpresaSchema, Omit<TipoEmpresaSchema, "id">>
    implements TipoEmpresaSchema
{
    declare id: number;

    @Column({ type: DataType.STRING(200), allowNull: false })
    declare value: TipoEmpresaSchema["value"];

    /* relación */
    @ForeignKey(() => TipoServicioEntity)
    @Column({ type: DataType.INTEGER, allowNull: false })
    declare tipo_servicio_id: number;

    @BelongsTo(() => TipoServicioEntity)
    declare tipo_servicio: V<TipoServicioEntity>;

    @HasOne(() => EmpresaEntity)
    declare empresa: V<EmpresaEntity>;
}
