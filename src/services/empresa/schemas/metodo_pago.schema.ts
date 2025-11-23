// services/payment/schemas/metodoPago.schema.ts

import { filesSchema } from "@services/uploads/schemas/uploads.schema";
import {
    array,
    boolean,
    maxLength,
    minLength,
    nullable,
    number,
    Output,
    object,
    record,
    string,
    toTrimmed,
} from "@vigilio/valibot";

export const metodoPagoSchema = object({
    id: number(),
    enabled_efectivo: boolean(), // el cliente venderá por efectivo tambien? osea el cliente podrá pagar cuando recibe el producto
    paypal: object({
        enabled: boolean(),
        client_id: nullable(
            string([minLength(3), maxLength(300), toTrimmed()])
        ),
        secret_key: nullable(
            string([minLength(3), maxLength(300), toTrimmed()])
        ),
    }), // el cliente venderá por efectivo tambien? osea el cliente podrá pagar cuando recibe el producto
    mercado_pago: object({
        token: nullable(string([minLength(3), maxLength(300), toTrimmed()])),
        enabled: boolean(),
    }),
    qr_yape_enabled: boolean(),
    qr_yape: nullable(array(filesSchema([800]))),
    qr_plin_enabled: boolean(),
    qr_plin: nullable(array(filesSchema([800]))),
    transferencias: nullable(
        record(
            string(),
            nullable(
                record(string(), nullable(string([minLength(3), toTrimmed()])))
            )
        )
    ),
    transferencias_enabled: boolean(),
    izipay: nullable(
        object({
            public_key: nullable(
                string([minLength(3), maxLength(300), toTrimmed()])
            ),
            client_id: nullable(
                string([minLength(3), maxLength(300), toTrimmed()])
            ),
            client_secret: nullable(
                string([minLength(3), maxLength(300), toTrimmed()])
            ),
            hash_key: nullable(
                string([minLength(3), maxLength(300), toTrimmed()])
            ),
            enabled: boolean(),
        })
    ),
    stripe: nullable(
        object({
            secret_key: nullable(
                string([minLength(3), maxLength(300), toTrimmed()])
            ),
            client_secret: nullable(
                string([minLength(3), maxLength(300), toTrimmed()])
            ),
            enabled: boolean(),
        })
    ),
    niubiz: nullable(
        object({
            merchant_id: nullable(
                string([minLength(3), maxLength(300), toTrimmed()])
            ),
            user: nullable(string([minLength(3), maxLength(300), toTrimmed()])),
            password: nullable(
                string([minLength(3), maxLength(300), toTrimmed()])
            ),

            enabled: boolean(),
        })
    ),
    user_id: number(),
    empresa_id: number(),
});
export type MetodoPagoSchema = Output<typeof metodoPagoSchema>;
