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
import { EmpresaRastreoSchema } from "../schemas/empresa_rastreo.schema";
import { EmpresaEntity } from "./empresa.entity";

@Table({ tableName: "empresa_rastreo", timestamps: false })
export class EmpresaRastreoEntity
    extends Model<EmpresaRastreoSchema, Omit<EmpresaRastreoSchema, "id">>
    implements EmpresaRastreoSchema
{
    declare id: number;

    @Column({ type: DataType.JSON })
    declare facebook_pixel: EmpresaRastreoSchema["facebook_pixel"];

    @Column({ type: DataType.JSON })
    declare google_manager: EmpresaRastreoSchema["google_manager"];

    @Column({ type: DataType.JSON })
    declare tiktok_pixel: EmpresaRastreoSchema["tiktok_pixel"];

    @Column({ type: DataType.JSON })
    declare linkedin_tag: EmpresaRastreoSchema["linkedin_tag"];

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
