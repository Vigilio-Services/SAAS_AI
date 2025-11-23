import { timestampsObject } from "@libs/index";
import {
    boolean,
    type Input,
    IPV4_REGEX,
    maxLength,
    maxValue,
    minLength,
    minValue,
    number,
    object,
    regex,
    string,
    toTrimmed,
} from "@vigilio/valibot";

export const whatsappSchema = object({
    id: number(),
    ip: string([regex(IPV4_REGEX)]),
    password: string([minLength(2), maxLength(100), toTrimmed()]),
    memory: number([minValue(2), maxValue(100)]),
    cpu: number([minValue(2), maxValue(100)]),
    inteligencia_artificial_id: number("Este campo es obligatorio."),
    is_enabled: boolean(),
    user_id: number(),
    empresa_id: number(),
    ...timestampsObject.entries,
});
export type WhatsappSchema = Input<typeof whatsappSchema>;
