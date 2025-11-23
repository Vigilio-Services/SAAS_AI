import { memory, useQuery } from "@vigilio/preact-fetching";
import { CitySchema } from "../schemas/city.schema";
import { CountrySchema } from "../schemas/country.schema";
import { RegionSchema } from "../schemas/region.schema";

export function unbigeoIndexApi() {
    return useQuery<UnbigeoIndexQueryAPI, UnbigeoIndexQueryAPIError>(
        "/ubigeo/",
        async (url) => {
            const cachename = `/api${url}`;
            let result = memory.get(cachename);
            if (!result) {
                const response = await fetch(cachename);
                result = await response.json();
                if (!response.ok) {
                    throw result;
                }
                memory.set(cachename, result);
            }
            return result;
        }
    );
}

export interface UnbigeoIndexQueryAPI {
    success: boolean;
    data: (CountrySchema & {
        regions: (RegionSchema & {
            cities: CitySchema[];
        })[];
    })[];
}
interface UnbigeoIndexQueryAPIError {
    success: false;
    message: string;
}
