import { Input, omit } from "@vigilio/valibot";
import { empresaPaymentSchema } from "../schemas/empresa_payment.schema";

export const empresaPaymentUpdateDto = omit(empresaPaymentSchema, [
    "id",
    "tipo_impuesto",
    "money",
    "bancos",
    "user_id",
    "created_at",
    "updated_at",
    "empresa_id",
]);
export type EmpresaPaymentUpdateDto = Input<typeof empresaPaymentUpdateDto>;
