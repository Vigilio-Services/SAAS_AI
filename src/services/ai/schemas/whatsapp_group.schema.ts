import { timestampsObject } from "@libs/index";
import { number, Output, object, string } from "@vigilio/valibot";

export const whatsappGroupSchema = object({
    id: number(),
    name: string(),
    user_id: number(),
    empresa_id: number(),
    ...timestampsObject.entries,
});
export type WhatsappGroupSchema = Output<typeof whatsappGroupSchema>;
