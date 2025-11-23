import { RUC_REGEX } from "@libs/index";
import { filesSchema } from "@services/uploads/schemas/uploads.schema";
import {
    array,
    boolean,
    Input,
    minLength,
    nullable,
    number,
    object,
    regex,
    string,
    toTrimmed,
} from "@vigilio/valibot";

export const companySchema = object({
    id: number(),
    ruc: string([toTrimmed(), regex(RUC_REGEX, "Ruc no válido")]),
    razon_social: string([toTrimmed(), minLength(3)]),
    nombre_comercial: string([toTrimmed(), minLength(3)]),
    sol_user: string([toTrimmed()]),
    sol_pass: string([toTrimmed()]),
    // only guia de remision
    client_id: nullable(string()),
    client_secret: nullable(string()),
    certificado_password: nullable(string()),
    production: boolean(),
    logo_facturacion: array(filesSchema([300])), // logo que se muestra en las facturas, boleta, nota,etc.
    certificado_digital: array(filesSchema()), //certificado digital
    user_id: number(),
    empresa_id: number(),
});
export type CompanySchema = Input<typeof companySchema>;
