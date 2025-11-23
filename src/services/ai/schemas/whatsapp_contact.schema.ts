import { timestampsObject } from "@libs/index";
import { filesSchema } from "@services/uploads/schemas/uploads.schema";
import {
    array,
    boolean,
    maxLength,
    minLength,
    nullable,
    number,
    Output,
    object,
    string,
    toTrimmed,
} from "@vigilio/valibot";

export const whatsappContactSchema = object({
    id: number(),
    name: string([minLength(2), maxLength(100), toTrimmed()]),
    telephone: string([minLength(5), maxLength(30), toTrimmed()]),
    is_favorite: boolean(),
    is_ai: boolean(),
    photo: nullable(array(filesSchema())),
    whatsapp_id: number(),
    user_id: number(),
    empresa_id: number(),
    ...timestampsObject.entries,
});
export type WhatsappContactSchema = Output<typeof whatsappContactSchema>;
