import { timestampsObject } from "@libs/index";
import {
    coerce,
    date,
    type Input,
    literal,
    maxLength,
    nullable,
    number,
    object,
    string,
    union,
} from "@vigilio/valibot";

export const errorLogSchema = object({
    id: number(),
    code: string(),
    username: nullable(string([maxLength(1000)])),
    ip: string([maxLength(1000)]),
    address: string([maxLength(1000)]),
    browser: string([maxLength(100)]),
    os: string([maxLength(100)]),
    fecha_hora: coerce(date(), (value) => new Date(value as string)),
    type: union([
        literal("auth-email"),
        literal("auth-password"),
        literal("auth-forgot-password"),
        literal("email"),
        literal("payment"),
    ]),
    ...timestampsObject.entries,
});

export type ErrorLogSchema = Input<typeof errorLogSchema>;
