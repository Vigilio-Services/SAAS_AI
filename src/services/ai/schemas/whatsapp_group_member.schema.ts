import { number, Output, object } from "@vigilio/valibot";

export const whatsappGroupMemberSchema = object({
    id: number(),
    group_whatsapp_id: number(),
    empresa_id: number(),
});
export type WhatsappGroupMemberSchema = Output<
    typeof whatsappGroupMemberSchema
>;
