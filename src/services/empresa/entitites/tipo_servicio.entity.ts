import type { V } from "@config/server/const";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { TipoServicioSchema } from "../schemas/tipo_servicio.schema";
import { TipoEmpresaEntity } from "./tipo_empresa.entity";

@Table({ tableName: "tipo_servicio", timestamps: true })
export class TipoServicioEntity
    extends Model<TipoServicioSchema, Omit<TipoServicioSchema, "id">>
    implements TipoServicioSchema
{
    declare id: number;

    @Column({ type: DataType.STRING(200), allowNull: false })
    declare value: TipoServicioSchema["value"];

    @HasMany(() => TipoEmpresaEntity)
    declare tipo_empresas: V<TipoEmpresaEntity>[];
}
