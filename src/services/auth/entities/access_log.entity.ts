import type { V } from "@config/server/const";
import { UserEntity } from "@services/user/entities/user.entity";
import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Index,
    Model,
    Table,
    Unique,
} from "sequelize-typescript";
import { AccessLogSchema } from "../schemas/access_log.schema";

@Table({ tableName: "access_log" })
export class AccessLog
    extends Model<AccessLogSchema, Omit<AccessLogSchema, "id">>
    implements AccessLogSchema
{
    declare id: number;

    @Index
    @Unique
    @Column({ type: DataType.STRING(20), allowNull: false })
    declare code: string;

    @Column({ type: DataType.STRING(1000) })
    declare ip: string;

    @Column({ type: DataType.STRING(1000) })
    declare address: string;

    @Column({ type: DataType.DATE })
    declare fecha_hora: Date;

    @Column({ type: DataType.STRING(1000) })
    declare browser: string;

    @Column({ type: DataType.STRING(100) })
    declare os: string;

    @ForeignKey(() => UserEntity)
    @Column
    declare user_id: number;

    @BelongsTo(() => UserEntity)
    declare user: V<UserEntity>;
}
