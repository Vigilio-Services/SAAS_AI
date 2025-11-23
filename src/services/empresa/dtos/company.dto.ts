import validFileValibot from "@libs/client/valibot";
import { extensions } from "@services/uploads/libs/client";
import { array, Input, instance, object, omit } from "@vigilio/valibot";
import { companySchema } from "../schemas/company.schema";

export const companyUpdateDto = omit(companySchema, [
    "id",
    "certificado_digital",
    "logo_facturacion",
    "empresa_id",
]);
export type CompanyUpdateDto = Input<typeof companyUpdateDto>;

export const certificadoDigitalUpdateDto = object({
    certificado_digital: array(instance(File), "Archivos no válidos.", [
        validFileValibot({
            required: true,
            min: 1,
            max: 1,
            maxSize: 100, // 10MB
            types: [],
        }),
    ]),
});

export type CertificadoDigitalUpdateDto = Input<
    typeof certificadoDigitalUpdateDto
>;
export const logoFacturacionUpdateDto = object({
    logo_facturacion: array(instance(File), "Archivos no válidos.", [
        validFileValibot({
            required: true,
            min: 1,
            max: 1,
            types: extensions.image,
            maxSize: 10, // 10MB
        }),
    ]),
});

export type LogoFacturacionUpdateDto = Input<typeof logoFacturacionUpdateDto>;
