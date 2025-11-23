import {
    boolean,
    coerce,
    custom,
    date,
    Input,
    maxLength,
    minLength,
    nullable,
    number,
    object,
    string,
} from "@vigilio/valibot";

export const empresaHostSchema = object({
    id: number(),
    host: nullable(
        string([
            custom((val) => !val.startsWith("https://www"), "URL: empresa.com"),
            custom((val) => !val.startsWith("www."), "URL: empresa.com"),
            custom((val) => !val.endsWith("/"), "URL: empresa.com"),
        ])
    ),
    nameserver_one: nullable(string([minLength(3), maxLength(30)])),
    nameserver_two: nullable(string([minLength(3), maxLength(30)])),
    time: nullable(coerce(date(), (value) => new Date(value as string))),
    user_id: number(),
    enabled: boolean(),
    empresa_id: number(),
});

export type EmpresaHostSchema = Input<typeof empresaHostSchema>;
