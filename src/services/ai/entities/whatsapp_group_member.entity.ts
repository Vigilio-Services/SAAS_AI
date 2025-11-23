import { EmpresaEntity } from "@services/empresa/entitites/empresa.entity";
import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from "sequelize-typescript";
import { WhatsappGroupMemberSchema } from "../schemas/whatsapp_group_member.schema";
import { WhatsappGroupEntity } from "./whatsapp_group.entity";

@Table({ tableName: "whatsapp_group_member", timestamps: true })
export class WhatsappGroupMemberEntity
    extends Model<
        WhatsappGroupMemberSchema,
        Omit<WhatsappGroupMemberSchema, "id">
    >
    implements WhatsappGroupMemberSchema
{
    declare id: number;

    @ForeignKey(() => WhatsappGroupEntity)
    @Column({ type: DataType.INTEGER, allowNull: false })
    declare group_whatsapp_id: number;

    @ForeignKey(() => EmpresaEntity)
    @Column({ type: DataType.INTEGER, allowNull: false })
    declare empresa_id: number;
}
