import {
	Column,
	DataType,
	Index,
	Model,
	Table,
	Unique,
} from "sequelize-typescript";
import { ErrorLogSchema } from "../schemas/error_log.schema";

@Table({ tableName: "error_log" })
export class ErrorLog
	extends Model<ErrorLogSchema, Omit<ErrorLogSchema, "id">>
	implements ErrorLogSchema
{
	declare id: number;

	@Index
	@Unique
	@Column({ type: DataType.STRING(20), allowNull: false })
	declare code: string;

	@Column({ type: DataType.STRING(1000) })
	declare ip: string;

	@Column({ type: DataType.STRING(1000) })
	declare username: string | null;

	@Column({ type: DataType.STRING(1000) })
	declare address: string;

	@Column({ type: DataType.STRING(100) })
	declare os: string;

	@Column({ type: DataType.DATE })
	declare fecha_hora: Date;

	@Column({ type: DataType.STRING(1000) })
	declare browser: string;

	@Column({
		type: DataType.ENUM<ErrorLogSchema["type"]>(
			"auth-email",
			"auth-password",
			"auth-forgot-password",
			"email",
			"payment",
		),
	})
	declare type: ErrorLogSchema["type"];
}
