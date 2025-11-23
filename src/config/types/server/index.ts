import { CreateOptions } from "sequelize";

export interface CustomCreateOptions extends CreateOptions {
	context?: {
		_timezone?: string;
	};
}
