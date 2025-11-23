import { ARRAY_CONST } from "@config/types";
import { CitySchema } from "@services/ubigeo/schemas/city.schema";
import { CountrySchema } from "@services/ubigeo/schemas/country.schema";
import { RegionSchema } from "@services/ubigeo/schemas/region.schema";
import { EmpresaSchema } from "../schemas/empresa.schema";
import { tipo_servicio_seeder } from "../seeders/tipo_empresa.seeder";
import { countries } from "./country";

// CONST
export const TIPO_SERVICIO_ARRAY: ARRAY_CONST<number>[] =
    tipo_servicio_seeder.map((tipo_servicio) => ({
        key: tipo_servicio.id,
        value: tipo_servicio.label,
    }));

export const TIPO_EMPRESA_ARRAY: ARRAY_CONST<number>[] =
    tipo_servicio_seeder.flatMap((tipo_servicio) =>
        tipo_servicio.empresas.map((tipo_empresa) => ({
            key: tipo_empresa.id,
            value: tipo_empresa.value,
        }))
    );
export const TIPO_EMPRESA_TIMEZONE_ARRAY: ARRAY_CONST<
    EmpresaSchema["timezone"]
>[] = countries.map((country) => ({
    key: country.tz,
    value: country.tz,
}));
export const TIPO_EMPRESA_DIAL_CODE_ARRAY: ARRAY_CONST<
    EmpresaSchema["dial_code"]
>[] = countries.map((country) => ({
    key: country.dial_code,
    value: country.dial_code,
}));

export const TIPO_EMPRESA_LANG_ARRAY: ARRAY_CONST<EmpresaSchema["lang"]>[] = [
    { key: "es", value: "Español" },
    { key: "en", value: "English" },
    { key: "pt", value: "Portugese" },
];
export const TELEFONO_TYPE_ARRAY: ARRAY_CONST<
    EmpresaSchema["telephones"][0]["type"]
>[] = [
    { key: "cellphone", value: "Celular" },
    { key: "phone", value: "Teléfono" },
    { key: "whatsapp", value: "Whatsapp" },
];

export function findCityById(
    data: (CountrySchema & {
        regions: (RegionSchema & {
            cities: CitySchema[];
        })[];
    })[],
    city_id: number
) {
    for (const country of data) {
        const region = country.regions.find((r) =>
            r.cities.some((c) => c.id === city_id)
        );
        if (region) {
            const city = region.cities.find((c) => c.id === city_id)!;
            return {
                ...city,
                region: {
                    ...region,
                    country,
                },
            };
        }
    }
    return null;
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function transferencias(transferencias: any) {
    const data = Object.entries(transferencias).map(
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        (body) => Object.values((body as any)[1]).filter((val) => val)
    );

    // aca si  esta vacio entonces que sea null
    return data[0].length || data[1].length || data[2].length
        ? transferencias
        : null;
}

export const typeFiscal: Record<
    EmpresaSchema["dial_code"],
    { type_fiscal: string; type_dni: string }
> = {
    "52": {
        type_fiscal: "RFC",
        type_dni: "CURP",
    },
    "57": {
        type_fiscal: "NIT",
        type_dni: "Cédula de Ciudadanía",
    },
    "56": {
        type_fiscal: "RUT",
        type_dni: "RUN",
    },
    "598": {
        type_fiscal: "RUC",
        type_dni: "Cédula de Identidad",
    },
    "55": {
        type_fiscal: "CNPJ/CPF",
        type_dni: "RG",
    },
    "51": {
        type_fiscal: "RUC",
        type_dni: "DNI",
    },
    "593": {
        type_fiscal: "RUC",
        type_dni: "Cédula de Ciudadanía",
    },
    "34": {
        type_fiscal: "NIF",
        type_dni: "DNI",
    },
    "54": {
        type_fiscal: "CUIT",
        type_dni: "DNI",
    },
};
