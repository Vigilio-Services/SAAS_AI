import { timestampsObject } from "@libs/index";
import { countrySchema } from "@services/ubigeo/schemas/country.schema";
import { filesSchema } from "@services/uploads/schemas/uploads.schema";
import { UserCreated } from "@services/user/schemas/user.schema";
import {
    array,
    boolean,
    coerce,
    custom,
    date,
    email,
    Input,
    literal,
    maxLength,
    minLength,
    nullable,
    number,
    object,
    string,
    toTrimmed,
    union,
} from "@vigilio/valibot";
import { AddressSchemaFromServer } from "./address.schema";
import { CompanySchema } from "./company.schema";
import { EmpresaHostSchema } from "./empresa_host.schema";
import { EmpresaPaymentSchema } from "./empresa_payment.schema";
import { EmpresaRastreoSchema } from "./empresa_rastreo.schema";
import { EmpresaServiceSchema } from "./empresa_service.schema";
import { MetodoPagoSchema } from "./metodo_pago.schema";
import { SettingSchema } from "./setting.schema";
import { TipoEmpresaSchema } from "./tipo_empresa.schema";
import { TipoServicioSchema } from "./tipo_servicio.schema";

export const empresaSchema = object({
    id: number(),
    // INFORMACION
    name_empresa: string([minLength(3), maxLength(255), toTrimmed()]),
    dial_code: countrySchema.entries.dial_code,
    emails: array(string([email()])),
    telephones: array(
        object({
            type: union([
                literal("whatsapp"),
                literal("phone"),
                literal("cellphone"),
            ]),
            value: string([
                minLength(1),
                maxLength(30),
                custom(
                    (value) => /^\d+$/.test(value),
                    "Este campo solo permite números."
                ),
            ]),
            isReclamos: boolean(),
        })
    ),
    year_founded: coerce(date(), (value) => new Date(value as string)),
    schedule: array(
        object({
            id: number(),
            day: string([toTrimmed()]),
            openTime: string(),
            closeTime: string(),
            enabled: boolean(),
        })
    ),
    model_groq_ai: union([
        literal("open_ai"),
        literal("deepseek_ai"),
        literal("google_gemini_ai"),
        literal("mixstral_ai"),
        literal("grok_ai"),
        literal("meta_ai"),
        literal("claude_ai"),
        literal("kimi_ai"),
        literal("qwen_ai"),
    ]),
    type_empresa_id: number("Este campo es obligatorio."),
    type_empresa_other: string([minLength(3), maxLength(100), toTrimmed()]),
    timezone: string([minLength(3), maxLength(20)]),
    max_users: number(),
    token: string([maxLength(255), toTrimmed()]),
    lang: union([literal("es"), literal("en"), literal("pt")]),
    slug: string([maxLength(255), toTrimmed()]),
    is_template: boolean(),
    is_production: boolean(),
  
    // REDES
    red: object({
        facebook: object({
            enabled: boolean(),
            value: nullable(
                string([
                    custom((value) =>
                        value.startsWith("https://www.facebook.com")
                    ),
                    maxLength(500),
                    toTrimmed(),
                ])
            ),
        }),
        instagram: object({
            enabled: boolean(),
            value: nullable(
                string([
                    custom((value) =>
                        value.startsWith("https://www.instagram.com")
                    ),
                    maxLength(500),
                    toTrimmed(),
                ])
            ),
        }),
        x: object({
            enabled: boolean(),
            value: nullable(
                string([
                    custom((value) => value.startsWith("https://www.x.com")),
                    maxLength(500),
                    toTrimmed(),
                ])
            ),
        }),
        youtube: object({
            enabled: boolean(),
            value: nullable(
                string([
                    custom((value) =>
                        value.startsWith("https://www.youtube.com")
                    ),
                    maxLength(500),
                    toTrimmed(),
                ])
            ),
        }),
        tiktok: object({
            enabled: boolean(),
            value: nullable(
                string([
                    custom((value) =>
                        value.startsWith("https://www.tiktok.com")
                    ),
                    maxLength(500),
                    toTrimmed(),
                ])
            ),
        }),
        linkedin: object({
            enabled: boolean(),
            value: nullable(
                string([
                    custom((value) =>
                        value.startsWith("https://www.linkedin.com")
                    ),
                    maxLength(500),
                    toTrimmed(),
                ])
            ),
        }),
    }),

    // ENABLED
    enabled: object({
        is_open: boolean(),
        enabled_bot: boolean(),
        enabled_bot_web: boolean(),
        enabled_booster: boolean(),
        enabled_email_message: boolean(),
        enabled_animation: boolean(),
        enabled_sound: boolean(),
        enabled_map_marker: boolean(),
        enabled_address: boolean(),
        enabled_comentario_id: boolean(),
    }),

    // MULTIMEDIA
    logo: nullable(array(filesSchema())),
    logo_pwa: nullable(array(filesSchema())),
    icon: nullable(array(filesSchema())),
    user_id: number(),
    ...timestampsObject.entries,
});
export type EmpresaSchema = Input<typeof empresaSchema>;
export type EmpresaSchemaFromServer = EmpresaSchema & {
    user: UserCreated;
    company: CompanySchema;
    address: AddressSchemaFromServer;
    setting: SettingSchema;
    service: EmpresaServiceSchema;
    payment: EmpresaPaymentSchema;
    tipo_empresa: TipoEmpresaSchema & { tipo_servicio: TipoServicioSchema };
    host: EmpresaHostSchema;
    metodo_pago: MetodoPagoSchema;
    rastreo: EmpresaRastreoSchema;
};
