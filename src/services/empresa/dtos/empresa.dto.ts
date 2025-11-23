import validFileValibot from "@libs/client/valibot";
import { array, type Input, instance, object, omit } from "@vigilio/valibot";
import { empresaSchema } from "../schemas/empresa.schema";
export const empresaUpdateDto = omit(empresaSchema, [
    "id",
    "dial_code",
    "type_empresa_id",
    "timezone",
    "logo",
    "logo_pwa",
    "icon",
    "token",
    "is_production",
    "is_template",
    "max_users",
    "user_id",
    "created_at",
    "updated_at",
]);
export type EmpresaUpdateDto = Input<typeof empresaUpdateDto>;

export const empresaUpdateLogoDto = object({
    logo: array(instance(File), "Archivos no válidos.", [
        validFileValibot({
            required: false,
            min: 1,
            max: 1,
        }),
    ]),
});
export type EmpresaUpdateLogoDto = Input<typeof empresaUpdateLogoDto>;

export const empresaUpdateLogoLoadingDto = object({
    logo_loading: array(instance(File), "Archivos no válidos.", [
        validFileValibot({
            required: false,
            min: 1,
            max: 1,
        }),
    ]),
});
export type EmpresaUpdateLogoLoadingDto = Input<
    typeof empresaUpdateLogoLoadingDto
>;
