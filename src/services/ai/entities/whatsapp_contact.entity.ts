import type { V } from "@config/server/const";
import { EmpresaEntity } from "@services/empresa/entitites/empresa.entity";
import { FilesSchema } from "@services/uploads/schemas/uploads.schema";
import { UserEntity } from "@services/user/entities/user.entity";
import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from "sequelize-typescript";
import { WhatsappContactSchema } from "../schemas/whatsapp_contact.schema";
import { WhatsappEntity } from "./whatsapp.entity";

@Table({ tableName: "whatsapp_contact", timestamps: true })
export class WhatsappContactEntity
    extends Model<WhatsappContactSchema, Omit<WhatsappContactSchema, "id">>
    implements WhatsappContactSchema
{
    declare id: number;

    @Column({ type: DataType.STRING(100), allowNull: false })
    declare name: string;

    @Column({ type: DataType.STRING(100), allowNull: false })
    declare telephone: string;

    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
    declare is_favorite: boolean;

    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
    declare is_ai: boolean;

    @Column({ type: DataType.JSON, allowNull: true })
    declare photo: FilesSchema[] | null;

    @ForeignKey(() => WhatsappEntity)
    @Column({ type: DataType.INTEGER, allowNull: false })
    declare whatsapp_id: number;

    @BelongsTo(() => WhatsappEntity)
    declare whatsapp: V<WhatsappEntity>;

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
