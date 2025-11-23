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
import { CompanySchema } from "../schemas/company.schema";
import { EmpresaEntity } from "./empresa.entity";

@Table({ tableName: "company", timestamps: false })
export class CompanyEntity
    extends Model<CompanySchema, Omit<CompanySchema, "id">>
    implements CompanySchema
{
    declare id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    declare ruc: string;

    @Column({ type: DataType.STRING, allowNull: false })
    declare razon_social: string;

    @Column({ type: DataType.STRING, allowNull: false })
    declare nombre_comercial: string;

    @Column({ type: DataType.STRING, allowNull: false })
    declare sol_user: string;

    @Column({ type: DataType.STRING, allowNull: false })
    declare sol_pass: string;

    @Column({ type: DataType.STRING, allowNull: true })
    declare client_id: string | null;

    @Column({ type: DataType.STRING, allowNull: true })
    declare client_secret: string | null;

    @Column({ type: DataType.STRING, allowNull: true })
    declare certificado_password: string | null;

    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
    declare production: boolean;

    @Column({ type: DataType.JSON, allowNull: false })
    declare logo_facturacion: CompanySchema["logo_facturacion"];

    @Column({ type: DataType.JSON, allowNull: false })
    declare certificado_digital: CompanySchema["certificado_digital"];

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
