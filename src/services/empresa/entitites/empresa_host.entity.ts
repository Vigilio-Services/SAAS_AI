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
import { EmpresaHostSchema } from "../schemas/empresa_host.schema";
import { EmpresaEntity } from "./empresa.entity";

@Table({ tableName: "empresa_host" })
export class EmpresaHostEntity
    extends Model<EmpresaHostSchema, Omit<EmpresaHostSchema, "id">>
    implements EmpresaHostSchema
{
    declare id: number;

    @Column({ type: DataType.STRING(100) })
    declare host: string | null;

    @Column({ type: DataType.STRING(30) })
    declare nameserver_one: string | null;

    @Column({ type: DataType.STRING(30) })
    declare nameserver_two: string | null;

    @Column({ type: DataType.DATE })
    declare time: Date | null;

    @Column({ type: DataType.BOOLEAN })
    declare enabled: boolean;

    /* ---------- RELACIONES ---------- */

    @ForeignKey(() => UserEntity)
    @Column
    declare user_id: number;

    @BelongsTo(() => UserEntity)
    declare user: V<UserEntity>;

    @ForeignKey(() => EmpresaEntity)
    @Column
    declare empresa_id: number;

    @BelongsTo(() => EmpresaEntity)
    declare empresa: V<EmpresaEntity>;
}
