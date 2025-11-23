import type { V } from "@config/server/const";
import { EmpresaEntity } from "@services/empresa/entitites/empresa.entity";
import { UserEntity } from "@services/user/entities/user.entity";
import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from "sequelize-typescript";
import type { WhatsappSchema } from "../schemas/whatsapp_schema";
import { InteligenciaArtificialEntity } from "./inteligencia_artificial.entity";

@Table({ tableName: "whatsapp" })
export class WhatsappEntity
    extends Model<WhatsappSchema, Omit<WhatsappSchema, "id">>
    implements WhatsappSchema
{
    declare id: number;

    @Column({ type: DataType.STRING(20), allowNull: false })
    declare ip: string;

    @Column({ type: DataType.STRING(100), allowNull: false })
    declare password: string;

    @Column({ type: DataType.INTEGER, allowNull: false })
    declare memory: number;

    @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
    declare cpu: number;

    @ForeignKey(() => InteligenciaArtificialEntity)
    @Column({ type: DataType.INTEGER, allowNull: false })
    declare inteligencia_artificial_id: number;

    @BelongsTo(() => InteligenciaArtificialEntity)
    declare inteligenciaArtificial: V<InteligenciaArtificialEntity>;

    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
    declare is_enabled: boolean;

    @ForeignKey(() => UserEntity)
    @Column({ type: DataType.INTEGER, allowNull: false })
    declare user_id: number;

    @BelongsTo(() => UserEntity)
    declare user: UserEntity;

    @ForeignKey(() => EmpresaEntity)
    @Column({ type: DataType.INTEGER, allowNull: false })
    declare empresa_id: number;

    @BelongsTo(() => EmpresaEntity)
    declare empresa: EmpresaEntity;
}
