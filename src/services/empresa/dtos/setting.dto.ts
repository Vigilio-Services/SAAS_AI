import { Input, omit } from "@vigilio/valibot";
import { settingSchema } from "../schemas/setting.schema";

export const settingUpdateDto = omit(settingSchema, ["id", "empresa_id"]);
export type SettingUpdateDto = Input<typeof settingUpdateDto>;
