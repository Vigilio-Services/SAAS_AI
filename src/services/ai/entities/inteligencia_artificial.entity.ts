import type { V } from "@config/server/const";
import { EmpresaEntity } from "@services/empresa/entitites/empresa.entity";
import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from "sequelize-typescript";
import type { InteligenciaArtificialSchema } from "../schemas/inteligencia_artificial.schema";

@Table({ tableName: "inteligencia_artificial", timestamps: false })
export class InteligenciaArtificialEntity
    extends Model<
        InteligenciaArtificialSchema,
        Omit<InteligenciaArtificialSchema, "id">
    >
    implements InteligenciaArtificialSchema
{
    declare id: number;

    @Column({ type: DataType.STRING(100), allowNull: false })
    declare name: string;

    @Column({ type: DataType.TEXT("long"), allowNull: false })
    declare prompt: string;

    @Column({ type: DataType.JSON, allowNull: false })
    declare timer: InteligenciaArtificialSchema["timer"];

    @Column({ type: DataType.STRING(100), allowNull: false })
    declare type: InteligenciaArtificialSchema["type"];

    @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
    declare history: number;

    @Column({ type: DataType.JSON, allowNull: false })
    declare usage: InteligenciaArtificialSchema["usage"];

    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
    declare is_chunk: boolean;

    @Column({ type: DataType.INTEGER, allowNull: false })
    declare max_length: number;

    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
    declare enabled_bot_inteligence: boolean;

    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
    declare enabled_cart: boolean;

    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
    declare enabled_order: boolean;

    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
    declare enabled_cita: boolean;

    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
    declare enabled_envios: boolean;

    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
    declare enabled_human: boolean;

    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
    declare show_all_product_information: boolean;

    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
    declare try_to_sell: boolean;

    @ForeignKey(() => EmpresaEntity)
    @Column({ type: DataType.INTEGER, allowNull: false })
    declare empresa_id: number;

    @BelongsTo(() => EmpresaEntity)
    declare empresa: V<EmpresaEntity>;
}
