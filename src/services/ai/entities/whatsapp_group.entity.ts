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
import { WhatsappGroupSchema } from "../schemas/whatsapp_group.schema";

@Table({ tableName: "whatsapp_group" })
export class WhatsappGroupEntity
    extends Model<WhatsappGroupSchema, Omit<WhatsappGroupSchema, "id">>
    implements WhatsappGroupSchema
{
    declare id: number;

    @Column({ type: DataType.STRING(100), allowNull: false })
    declare name: string;

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
