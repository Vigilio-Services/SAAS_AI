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
import { InteligenciaArtificialQuestionSchema } from "../schemas/inteligencia_artificial_question_schema";

@Table({ tableName: "inteligencia_artificial_question" })
export class InteligenciaArtificialQuestionEntity
    extends Model<
        InteligenciaArtificialQuestionSchema,
        Omit<InteligenciaArtificialQuestionSchema, "id">
    >
    implements InteligenciaArtificialQuestionSchema
{
    declare id: number;

    @Column({ type: DataType.STRING(300), allowNull: false })
    declare question: string;

    @Column({ type: DataType.STRING(300), allowNull: false })
    declare answer: string;

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
