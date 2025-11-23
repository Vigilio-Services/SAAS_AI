import { POSIVES_NUMERIC_REGEX, timestampsObject } from "@libs/index";
import { CitySchema } from "@services/ubigeo/schemas/city.schema";
import { CountrySchema } from "@services/ubigeo/schemas/country.schema";
import { RegionSchema } from "@services/ubigeo/schemas/region.schema";
import { UserSelect } from "@services/user/schemas/user.schema";
import {
    boolean,
    Input,
    maxLength,
    minLength,
    number,
    object,
    regex,
    string,
    toTrimmed,
} from "@vigilio/valibot";

export const addressSchema = object({
    id: number(),
    ubigeo: string([
        toTrimmed(),
        minLength(1),
        regex(POSIVES_NUMERIC_REGEX, "Este campo permite solo números."),
    ]),
    urbanizacion: string([toTrimmed(), minLength(5), maxLength(1000)]),
    direccion: string([toTrimmed(), minLength(5), maxLength(1000)]),
    cod_local: string([maxLength(20), toTrimmed()]),
    enabled: boolean(),
    city_id: number("Este campo es obligatorio."),
    user_id: number("Este campo es obligatorio."),
    empresa_id: number("Este campo es obligatorio."),
    ...timestampsObject.entries,
});
export type AddressSchema = Input<typeof addressSchema>;
export type AddressSchemaFromServer = AddressSchema & {
    city: CitySchema & { region: RegionSchema & { country: CountrySchema } };
    user: UserSelect;
};
