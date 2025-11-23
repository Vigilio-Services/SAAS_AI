import {
    boolean,
    Input,
    maxLength,
    minLength,
    nullable,
    number,
    object,
    string,
    toTrimmed,
} from "@vigilio/valibot";

export const empresaRastreoSchema = object({
    id: number(),
    facebook_pixel: object({
        enabled: boolean(),
        value: nullable(string([minLength(3), maxLength(1000), toTrimmed()])),
    }),
    google_manager: object({
        enabled: boolean(),
        value: nullable(string([minLength(3), maxLength(1000), toTrimmed()])),
    }),
    tiktok_pixel: object({
        enabled: boolean(),
        value: nullable(string([minLength(3), maxLength(1000), toTrimmed()])),
    }),
    linkedin_tag: object({
        enabled: boolean(),
        value: nullable(string([minLength(3), maxLength(1000), toTrimmed()])),
    }),
    user_id: number(),
    empresa_id: number(),
});

export type EmpresaRastreoSchema = Input<typeof empresaRastreoSchema>;
