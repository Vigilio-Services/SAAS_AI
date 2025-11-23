import { cacheGetJson, cacheTimes } from "@libs/server/helpers";
import { Injectable } from "@vigilio/express-core";
import cache from "@vigilio/express-core/cache";
import { CityEntity } from "../entities/city.entity";
import { CountryEntity } from "../entities/country.entity";
import { RegionEntity } from "../entities/region.entity";

@Injectable()
export class UbigeoService {
    async index() {
        let data = await cacheGetJson("ubigeo");
        if (!data) {
            data = await CountryEntity.findAll({
                include: [
                    {
                        model: RegionEntity,
                        include: [
                            {
                                model: CityEntity,
                            },
                        ],
                    },
                ],
                where: {
                    dial_code: "51",
                },
            });
            cache.set(
                "ubigeo",
                JSON.stringify(
                    (data as CityEntity[]).map((item) =>
                        item.get({ plain: true })
                    )
                ),
                cacheTimes.days30
            );
        }
        return {
            success: true,
            data,
        };
    }
}
