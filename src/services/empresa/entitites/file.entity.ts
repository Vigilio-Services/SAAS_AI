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
import { FileSchema } from "../schemas/file.schema";
import { EmpresaEntity } from "./empresa.entity";

@Table({ tableName: "file" })
export class FileEntity
    extends Model<FileSchema, Omit<FileSchema, "id">>
    implements FileSchema
{
    declare id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    declare name: string;

    @Column({ type: DataType.JSON, allowNull: false })
    declare file: FileSchema["file"];

    @Column({ type: DataType.JSON, allowNull: false })
    declare history: FileSchema["history"];

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
