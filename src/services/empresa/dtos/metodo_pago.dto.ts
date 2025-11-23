import validFileValibot from "@libs/client/valibot";
import {
    array,
    Input,
    instance,
    nullable,
    object,
    omit,
} from "@vigilio/valibot";
import { metodoPagoSchema } from "../schemas/metodo_pago.schema";

export const metodoPagoUpdateDto = omit(metodoPagoSchema, [
    "id",
    "qr_plin",
    "qr_yape",
    "user_id",
    "empresa_id",
]);
export type MetodoPagoUpdateDto = Input<typeof metodoPagoUpdateDto>;

export const metodoQrYapeUpdateQrDto = object({
    qr_plin: nullable(
        array(instance(File), "Archivos no válidos.", [
            validFileValibot({
                required: false,
                min: 1,
                max: 1,
            }),
        ])
    ),
});
export type MetodoQrYapeUpdateQrDto = Input<typeof metodoQrYapeUpdateQrDto>;

export const metodoQrPlinUpdateQrDto = object({
    qr_plin: nullable(
        array(instance(File), "Archivos no válidos.", [
            validFileValibot({
                required: false,
                min: 1,
                max: 1,
            }),
        ])
    ),
});
export type MetodoQrPlinUpdateQrDto = Input<typeof metodoQrPlinUpdateQrDto>;
