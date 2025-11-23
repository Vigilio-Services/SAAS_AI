import { timestampsObject } from "@libs/index";
import {
    coerce,
    date,
    type Input,
    maxLength,
    number,
    object,
    string,
} from "@vigilio/valibot";

export const accessLogSchema = object({
    id: number(),
    code: string(),
    ip: string([maxLength(1000)]),
    address: string([maxLength(1000)]),
    browser: string([maxLength(100)]),
    os: string([maxLength(100)]),
    fecha_hora: coerce(date(), (value) => new Date(value as string)),
    user_id: number("Esta campo es obligatorio."),
    ...timestampsObject.entries,
});

export type AccessLogSchema = Input<typeof accessLogSchema>;
