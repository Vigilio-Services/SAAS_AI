import {
    boolean,
    Input,
    literal,
    maxLength,
    maxValue,
    minLength,
    minValue,
    number,
    object,
    string,
    toTrimmed,
    union,
} from "@vigilio/valibot";

export const inteligenciaArtificialSchema = object({
    id: number(),
    name: string([minLength(3), maxLength(100), toTrimmed()]),
    timer: object({
        start: number([minValue(0), maxValue(5)]),
        finish: number([minValue(5), maxValue(20)]),
    }), // JSON libre
    history: number(),
    type: union([
        literal("Asistente Administrativo"),
        literal("Asistente Ejecutivo"),
        literal("Asistente Virtual"),
        literal("Asistente de Ventas"),
        literal("Asistente de Recursos Humanos"),
        literal("Asistente de Marketing"),
        literal("Asistente Financiero/Contable"),
        literal("Asistente de Atención al Cliente"),
        literal("Asistente Operativo/Logístico"),
        literal("Asistente Legal"),
        literal("Asistente Técnico/IT"),
        literal("Asistente de Eventos"),
    ]),
    prompt: string([minLength(3), toTrimmed()]),
    usage: object({ input_tokens: number(), output_tokens: number() }),
    is_chunk: boolean(),
    max_length: number(),
    // SETTINGS
    enabled_bot_inteligence: boolean(),
    enabled_cart: boolean(),
    enabled_order: boolean(),
    enabled_cita: boolean(),
    enabled_envios: boolean(),
    enabled_human: boolean(),
    show_all_product_information: boolean(),
    try_to_sell: boolean(),
    empresa_id: number(),
});
export type InteligenciaArtificialSchema = Input<
    typeof inteligenciaArtificialSchema
>;
