import { timestampsObject } from "@libs/index";
import { filesSchema } from "@services/uploads/schemas/uploads.schema";
import { UserCreated } from "@services/user/schemas/user.schema";
import {
    array,
    Input,
    minLength,
    number,
    object,
    string,
    toTrimmed,
} from "@vigilio/valibot";

export const fileSchema = object({
    id: number(),
    name: string([minLength(3), toTrimmed()]),
    file: array(filesSchema()),
    history: array(string()),
    user_id: number("Esta campo es obligatorio."),
    empresa_id: number("Esta campo es obligatorio."),
    ...timestampsObject.entries,
});
export type FileSchema = Input<typeof fileSchema>;
export type FileSchemaFromServer = Input<typeof fileSchema> & {
    user: UserCreated;
};
export type FileSchemaToClient = Pick<FileSchema, "id" | "name" | "file">;
