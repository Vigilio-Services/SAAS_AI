import { cacheGetJson, cacheTimes } from "@libs/server/helpers";
import { CityEntity } from "@services/ubigeo/entities/city.entity";
import { CountryEntity } from "@services/ubigeo/entities/country.entity";
import { RegionEntity } from "@services/ubigeo/entities/region.entity";
import { UserEntity } from "@services/user/entities/user.entity";
import type {
    UserSchema,
    UserSchemaFromServer,
} from "@services/user/schemas/user.schema";
import cache from "@vigilio/express-core/cache";
import { Includeable } from "sequelize";

export function userModified(
    as: "user",
    rest?: Omit<Includeable, "model" | "as" | "attributes">
): Includeable {
    return {
        model: UserEntity.unscoped(),
        as,
        attributes: [
            "id",
            "user_name",
            "full_name",
            "father_lastname",
            "mother_lastname",
            "photo",
            "role",
        ] satisfies (keyof UserSchema)[],
        ...(rest || {}),
    };
}
export function userSelect(
    as:
        | "user_student"
        | "user_academic"
        | "sender"
        | "user"
        | "user_administracion"
): Includeable {
    return {
        model: UserEntity.unscoped(),
        as,
        attributes: [
            "id",
            "user_name",
            "telefono",
            "documento_code",
            "documento",
            "photo",
            "full_name",
            "father_lastname",
            "mother_lastname",
            "role",
        ] satisfies (keyof UserSchema)[],
    };
}

export async function userShow(id: string) {
    let user = cacheGetJson(`user:${id}`);
    if (!user) {
        user = await UserEntity.findByPk(id, {
            attributes: { exclude: ["password"] },
            include: [
                {
                    model: CityEntity,
                    attributes: ["id", "name"],
                    include: [
                        {
                            model: RegionEntity,
                            attributes: ["id", "name"],
                            include: [
                                {
                                    model: CountryEntity,
                                    attributes: ["id", "name"],
                                },
                            ],
                        },
                    ],
                },
            ],
        });
        if (!user) {
            return null;
        }

        user = (user as UserEntity).get({ plain: true });
        cache.set(`user:${id}`, JSON.stringify(user), cacheTimes.days7);
    }
    return {
        success: true,
        user: {
            ...(user as UserSchemaFromServer),
        } as UserSchemaFromServer,
    };
}
