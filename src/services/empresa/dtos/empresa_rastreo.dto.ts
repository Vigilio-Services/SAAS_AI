import { Input, omit } from "@vigilio/valibot";
import { empresaRastreoSchema } from "../schemas/empresa_rastreo.schema";

export const empresaRastreoUpdateDto = omit(empresaRastreoSchema, [
    "id",
    "user_id",
    "empresa_id",
]);
export type EmpresaRastreoUpdateDto = Input<typeof empresaRastreoUpdateDto>;
