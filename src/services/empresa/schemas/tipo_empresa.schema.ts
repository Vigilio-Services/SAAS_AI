import { timestampsObject } from "@libs/index";
import { type Input, number, object, string } from "@vigilio/valibot";

export const tipoEmpresaSchema = object({
    id: number(),
    value: string(),
    tipo_servicio_id: number("Este campo es obligatorio."),
    ...timestampsObject.entries,
});
export type TipoEmpresaSchema = Input<typeof tipoEmpresaSchema>;
