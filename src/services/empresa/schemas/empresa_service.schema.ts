import { timestampsObject } from "@libs/index";
import {
    boolean,
    coerce,
    date,
    Input,
    literal,
    maxLength,
    nullable,
    number,
    object,
    string,
    toTrimmed,
    union,
} from "@vigilio/valibot";

export const empresaServiceSchema = object({
    id: number(),
    groq_ai_token: string([maxLength(255), toTrimmed()]),
    cuota_web: nullable(
        object({
            type: union([
                literal("normal"),
                literal("pro"),
                literal("business"),
            ]),
            monto_local: number(),
            monto_dolar: number(),
            cuotas: number(),
            // max_cuotas: number(),
            date: coerce(date(), (val) => new Date(val as Date)),
        })
    ),
    cuota_chat: nullable(
        object({
            type: union([literal("free"), literal("pro"), literal("business")]),
            monto_local: number(),
            monto_dolar: number(),
            cuotas: number(),
            // max_cuotas: number(),
            date: coerce(date(), (val) => new Date(val as Date)),
        })
    ),
    tokens: number(),
    facturacion: nullable(
        object({
            date: nullable(
                coerce(date(), (value) => new Date(value as string))
            ),
            enabled: boolean(),
            cuotas: number(),
        })
    ),
    empresa_id: number("Este campo es obligatorio."),
    ...timestampsObject.entries,
});
export type EmpresaServiceSchema = Input<typeof empresaServiceSchema>;
