import { PASSWORD_REGEX, timestampsObject } from "@libs/index";
import { CitySchema } from "@services/ubigeo/schemas/city.schema";
import { CountrySchema } from "@services/ubigeo/schemas/country.schema";
import { RegionSchema } from "@services/ubigeo/schemas/region.schema";
import { filesSchema } from "@services/uploads/schemas/uploads.schema";
import {
    array,
    boolean,
    coerce,
    custom,
    date,
    email,
    type Input,
    literal,
    maxLength,
    minLength,
    nullable,
    number,
    object,
    startsWith,
    string,
    toTrimmed,
    union,
} from "@vigilio/valibot";
// Código de documentos
export const documento_code = union([
    literal("01"), // DNI
    literal("06"), // RUC
]);
export type DocumentCode = Input<typeof documento_code>;
export const subscription = object({
    endpoint: string(),
    keys: object({ p256dh: string(), auth: string() }),
});
export type SuscriptionSchema = Input<typeof subscription>;

export const userSchema = object({
    id: number(),
    code: string(),
    user_name: nullable(string([minLength(3), maxLength(30), toTrimmed()])),
    full_name: string([minLength(3), maxLength(100), toTrimmed()]),
    father_lastname: string([minLength(3), maxLength(100), toTrimmed()]),
    mother_lastname: string([minLength(3), maxLength(100), toTrimmed()]),
    gender: union([literal("masculino"), literal("femenino"), literal("otro")]),
    birthday: nullable(coerce(date(), (value) => new Date(value as string))),
    email: string([email(), maxLength(255), toTrimmed()]),
    documento_code,
    documento: string("Documento de identidad no válido"),
    password: nullable(
        string([
            minLength(8),
            maxLength(100),
            custom(
                (val) => PASSWORD_REGEX.test(val),
                "La contraseña no es válida, debe contener carácteres especiales, números y mayúsculas."
            ),

            toTrimmed(),
        ])
    ),
    profesion: nullable(string([minLength(3), maxLength(100), toTrimmed()])),
    presentation: nullable(string([maxLength(3000), toTrimmed()])),
    photo: nullable(array(filesSchema([100, 500]))),
    wallpaper: nullable(array(filesSchema([100, 1200]))),
    role: union([
        literal("administracion"),
        literal("worker"),
        literal("user"),
    ]),
    permisos: array(
        union([
            literal("empresa_update"),
            literal("user"),
            literal("inteligencia_artificial"),
            literal("setting"),
            literal("metodo_pago"),
            literal("empresa_rastreo"),
            literal("empresa_payment"),
            literal("empresa_company"),
            literal("empresa_address"),
            literal("whatsapp"),
            literal("whatsapp_contact"),
            literal("whatsapp_group"),
            literal("whatsapp_group_member"),
        ])
    ),
    telefono: string([
        minLength(9),
        maxLength(9),
        startsWith("9"),
        toTrimmed(),
    ]),
    status: union([
        literal("activo"),
        literal("desactivado"),
        literal("bloqueo-temporal"),
        literal("bloqueo-definitivo"),
    ]),
    intentos_session: number(),
    intentos_session_date: nullable(
        coerce(date(), (val) => new Date(val as Date))
    ),
    enabled_notifications_webpush: boolean(),
    enabled_email_offer: boolean(),

    ultima_conexion: nullable(coerce(date(), (val) => new Date(val as Date))),
    address: string([maxLength(500)]),
    subscription: nullable(subscription),
    user_id: nullable(number("Esta campo es obligatorio.")),
    city_id: nullable(number("Esta campo es obligatorio.")),
    slug: string([maxLength(255)]),
    ...timestampsObject.entries,
    deleted_at: nullable(coerce(date(), (val) => new Date(val as Date))),
});
export type UserSchema = Input<typeof userSchema>;

export type UserCreated = Pick<
    UserSchema,
    | "id"
    | "user_name"
    | "full_name"
    | "photo"
    | "role"
    | "father_lastname"
    | "mother_lastname"
>;

export type UserSelect = Pick<
    UserSchema,
    | "id"
    | "user_name"
    | "photo"
    | "documento_code"
    | "documento"
    | "telefono"
    | "full_name"
    | "father_lastname"
    | "mother_lastname"
    | "role"
>;

export type UserSchemaFromServer = UserSchema & {
    city: Pick<CitySchema, "id" | "name"> & {
        region: Pick<RegionSchema, "id" | "name"> & {
            country: Pick<CountrySchema, "id" | "name">;
        };
    };
};
