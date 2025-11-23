import type { V } from "@config/server/const";
import { FilesSchema } from "@services/uploads/schemas/uploads.schema";
import { UserEntity } from "@services/user/entities/user.entity";
import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    HasOne,
    Model,
    Table,
} from "sequelize-typescript";
import { EmpresaSchema } from "../schemas/empresa.schema";
import { AddressEntity } from "./address.entity";
import { CompanyEntity } from "./company.entity";
import { EmpresaHostEntity } from "./empresa_host.entity";
import { EmpresaPaymentEntity } from "./empresa_payment.entity";
import { EmpresaRastreoEntity } from "./empresa_rastreo.entity";
import { EmpresaServiceEntity } from "./empresa_service.entity";
import { FileEntity } from "./file.entity";
import { MetodoPagoEntity } from "./metodo_pago.entity";
import { SettingEntity } from "./setting.entity";
import { TipoEmpresaEntity } from "./tipo_empresa.entity";

@Table({ tableName: "empresa" })
export class EmpresaEntity
    extends Model<EmpresaSchema, Omit<EmpresaSchema, "id">>
    implements EmpresaSchema
{
    declare id: number;

    /* ---------- INFORMACIÓN ---------- */
    @Column({ type: DataType.STRING(10), allowNull: false })
    declare dial_code: EmpresaSchema["dial_code"];

    @Column({ type: DataType.STRING(255), allowNull: false })
    declare name_empresa: string;

    @Column({ type: DataType.JSON, allowNull: false })
    declare emails: EmpresaSchema["emails"];

    @Column({ type: DataType.JSON, allowNull: false })
    declare telephones: EmpresaSchema["telephones"];

    @Column({ type: DataType.DATEONLY, allowNull: false })
    declare year_founded: Date;

    @Column({ type: DataType.STRING(20), allowNull: false })
    declare timezone: string;

    @Column({ type: DataType.STRING(50), allowNull: false })
    declare model_groq_ai: EmpresaSchema["model_groq_ai"];

    @Column({ type: DataType.JSON, allowNull: false })
    declare schedule: EmpresaSchema["schedule"];

    @ForeignKey(() => TipoEmpresaEntity)
    @Column({ type: DataType.INTEGER, allowNull: false })
    declare type_empresa_id: number;

    @Column({ type: DataType.STRING(100), allowNull: true })
    declare type_empresa_other: string;

    @Column({ type: DataType.INTEGER, allowNull: false })
    declare max_users: number;

    @Column({ type: DataType.STRING(255), allowNull: false })
    declare token: string;

    @Column({ type: DataType.STRING(10), allowNull: false })
    declare lang: EmpresaSchema["lang"];

    @Column({ type: DataType.STRING(255), allowNull: false })
    declare slug: string;

    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
    declare is_template: boolean;

    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
    declare is_production: boolean;

    /* ---------- REDES ---------- */
    @Column({ type: DataType.JSON, allowNull: false })
    declare red: EmpresaSchema["red"];

    /* ---------- RASTREO ---------- */

    /* ---------- ENABLED ---------- */
    @Column({ type: DataType.JSON, allowNull: false })
    declare enabled: EmpresaSchema["enabled"];

    /* ---------- MULTIMEDIA ---------- */
    @Column({ type: DataType.JSON })
    declare logo: FilesSchema[] | null;

    @Column({ type: DataType.JSON })
    declare logo_pwa: FilesSchema[] | null;

    @Column({ type: DataType.JSON })
    declare icon: FilesSchema[] | null;

    // RELATIONS
    @BelongsTo(() => TipoEmpresaEntity)
    declare tipo_empresa: V<TipoEmpresaEntity>;

    @HasOne(() => CompanyEntity)
    declare company: V<CompanyEntity>;

    @HasOne(() => AddressEntity)
    declare address: V<AddressEntity>;

    @HasOne(() => SettingEntity)
    declare setting: V<SettingEntity>;

    @HasOne(() => EmpresaServiceEntity)
    declare service: V<EmpresaServiceEntity>;

    @HasOne(() => EmpresaPaymentEntity)
    declare payment: V<EmpresaPaymentEntity>;

    @HasOne(() => EmpresaRastreoEntity)
    declare rastreo: V<EmpresaRastreoEntity>;

    @HasOne(() => MetodoPagoEntity)
    declare metodo_pago: V<MetodoPagoEntity>;

    @HasOne(() => EmpresaHostEntity)
    declare host: V<EmpresaHostEntity>;

    @HasMany(() => FileEntity)
    declare files: V<FileEntity>[];

    /* ---------- RELACIONES ---------- */
    @ForeignKey(() => UserEntity)
    @Column
    declare user_id: number;

    @BelongsTo(() => UserEntity)
    declare user: V<UserEntity>;
}
