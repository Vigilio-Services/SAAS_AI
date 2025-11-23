import { timestampsObject } from "@libs/index";
import {
    array,
    boolean,
    Input,
    maxLength,
    number,
    object,
    string,
    toTrimmed,
} from "@vigilio/valibot";

export const empresaPaymentSchema = object({
    id: number(),
    tipo_impuesto: string([maxLength(10), toTrimmed()]),
    money: object({
        money: string(),
        international_simbolo: string(),
        simbolo: string(),
    }),
    enabled_igv: boolean(),
    igv: number(),
    bancos: array(string()),
    is_dolar: boolean(),
    enabled_dni_cart: boolean(),
    enabled_client_pay_comision: boolean(),
    enabled_sell_country: boolean(),
    user_id: number("Este campo es obligatorio."),
    empresa_id: number("Este campo es obligatorio."),
    ...timestampsObject.entries,
});
export type EmpresaPaymentSchema = Input<typeof empresaPaymentSchema>;
