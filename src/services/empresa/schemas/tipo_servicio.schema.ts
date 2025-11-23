import { timestampsObject } from "@libs/index";
import { Input, literal, number, object, union } from "@vigilio/valibot";

export const tipoServicioSchema = object({
    id: number(),
    value: union([
        literal("normal"),
        literal("restaurantes"),
        literal("servicios"),
        literal("portafolio"),
    ]),
    ...timestampsObject.entries,
});
export type TipoServicioSchema = Input<typeof tipoServicioSchema>;
