import type { V } from "@config/server/const";
import { EmpresaEntity } from "@services/empresa/entitites/empresa.entity";
import { EmpresaHostEntity } from "@services/empresa/entitites/empresa_host.entity";
import { EmpresaPaymentEntity } from "@services/empresa/entitites/empresa_payment.entity";
import { EmpresaRastreoEntity } from "@services/empresa/entitites/empresa_rastreo.entity";
import { FileEntity } from "@services/empresa/entitites/file.entity";
import { CityEntity } from "@services/ubigeo/entities/city.entity";
import { UserSchema } from "@services/user/schemas/user.schema";
import {
    BelongsTo,
    Column,
    DataType,
    Default,
    ForeignKey,
    HasMany,
    HasOne,
    Model,
    Table,
} from "sequelize-typescript";

@Table({ tableName: "user", paranoid: true })
export class UserEntity
    extends Model<UserSchema, Omit<UserSchema, "id">>
    implements UserSchema
{
    declare id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    declare code: string;

    @Column({ type: DataType.STRING(30) })
    declare user_name: string | null;

    @Column({ type: DataType.STRING(100), allowNull: false })
    declare full_name: string;

    @Column({ type: DataType.STRING(100), allowNull: false })
    declare father_lastname: string;

    @Column({ type: DataType.STRING(100), allowNull: false })
    declare mother_lastname: string;

    @Column({
        type: DataType.STRING(20),
        allowNull: false,
    })
    declare gender: UserSchema["gender"];

    @Column({ type: DataType.DATE })
    declare birthday: Date | null;

    @Column({ type: DataType.STRING(255), allowNull: false })
    declare email: string;

    @Column({
        type: DataType.STRING(10),
        allowNull: false,
    })
    declare documento_code: UserSchema["documento_code"];

    @Column({ type: DataType.STRING(30), allowNull: false })
    declare documento: string;

    @Column({ type: DataType.STRING(255) })
    declare password: string | null;

    @Column({ type: DataType.STRING(100) })
    declare profesion: string | null;

    @Column({ type: DataType.TEXT("medium") })
    declare presentation: string | null;

    @Column({ type: DataType.JSON })
    declare photo: UserSchema["photo"];

    @Column({ type: DataType.JSON })
    declare wallpaper: UserSchema["wallpaper"];

    @Column({
        type: DataType.ENUM("administracion", "worker", "user"),
        allowNull: false,
        defaultValue: "user",
    })
    declare role: UserSchema["role"];

    @Column({ type: DataType.JSON, allowNull: false, defaultValue: [] })
    declare permisos: UserSchema["permisos"];

    @Column({ type: DataType.STRING(20), allowNull: false })
    declare telefono: string;

    @Column({
        type: DataType.ENUM(
            "activo",
            "desactivado",
            "bloqueo-temporal",
            "bloqueo-definitivo"
        ),
        allowNull: false,
        defaultValue: "activo",
    })
    declare status: UserSchema["status"];

    @Default(0)
    @Column({ type: DataType.INTEGER, allowNull: false })
    declare intentos_session: number;

    @Column({ type: DataType.DATE })
    declare intentos_session_date: Date | null;

    @Default(true)
    @Column({ type: DataType.BOOLEAN, allowNull: false })
    declare enabled_notifications_webpush: boolean;

    @Default(true)
    @Column({ type: DataType.BOOLEAN, allowNull: false })
    declare enabled_email_offer: boolean;

    @Column({ type: DataType.DATE })
    declare ultima_conexion: Date | null;

    @Column({ type: DataType.STRING(500), allowNull: false, defaultValue: "" })
    declare address: string;

    @Column({ type: DataType.JSON })
    declare subscription: UserSchema["subscription"];

    @ForeignKey(() => UserEntity)
    @Column({ type: DataType.INTEGER })
    declare user_id: number | null;

    @BelongsTo(() => UserEntity)
    declare parent: UserEntity;

    @HasMany(() => UserEntity)
    declare children: UserEntity[];

    @ForeignKey(() => CityEntity)
    @Column({ type: DataType.INTEGER })
    declare city_id: number | null;

    @BelongsTo(() => CityEntity)
    declare city: CityEntity;

    @Column({ type: DataType.STRING(255), allowNull: false })
    declare slug: string;

    @Column({ type: DataType.DATE })
    declare deleted_at: Date | null;

    /* -------------- relaciones opcionales -------------- */
    @HasMany(() => FileEntity)
    declare files: V<FileEntity>[];

    @HasOne(() => EmpresaEntity)
    declare empresa: V<EmpresaEntity>;

    @HasOne(() => EmpresaPaymentEntity)
    declare empresa_payment: V<EmpresaPaymentEntity>;

    @HasOne(() => EmpresaRastreoEntity)
    declare empresa_rastreo: V<EmpresaRastreoEntity>;

    @HasOne(() => EmpresaHostEntity)
    declare empresa_host: V<EmpresaHostEntity>;
}
