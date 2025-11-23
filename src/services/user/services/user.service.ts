import { sequelize } from "@config/server/db.config";
import { slugify } from "@libs/index";
import {
    FiltersPaginator,
    generateCodeEntity,
    orWhereUser,
    paginator,
} from "@libs/server/helpers";
import Logger from "@libs/server/logger";
import { UserAuth } from "@services/auth/dtos/auth.dto";
import { CityEntity } from "@services/ubigeo/entities/city.entity";
import { CountryEntity } from "@services/ubigeo/entities/country.entity";
import { RegionEntity } from "@services/ubigeo/entities/region.entity";
import { Injectable, NotFoundException } from "@vigilio/express-core";
import { generateId } from "@vigilio/express-core/helpers";
import bcrypt from "bcryptjs";
import { Op, WhereOptions } from "sequelize";
import {
    UserStoreDto,
    UserUpdateDto,
    UserUpdatePasswordDto,
} from "../dtos/user.dto";
import { UserEntity } from "../entities/user.entity";
import { userShow } from "../libs/server";
import { UserSchema } from "../schemas/user.schema";

@Injectable()
export class UserService {
    async index(user: UserAuth, filters: FiltersPaginator<UserSchema>) {
        const result = await paginator<UserSchema>("user", {
            filters,
            cb: async (props) => {
                const { limit, offset, filters, search, ...resto } = props;
                let where: WhereOptions = {
                    id: {
                        [Op.not]: [user.id],
                    },
                };
                Logger.info({ search });
                if (filters?.role) {
                    where = {
                        ...where,
                        role: filters.role,
                    };
                }
                if (filters?.status) {
                    where = {
                        ...where,
                        status: filters.status,
                    };
                }

                if (["docente", "estudiante"].includes(user.role)) {
                    where = {
                        ...where,
                        ...(user.role === "docente" ||
                        user.role === "estudiante"
                            ? {
                                  [Op.or]: [
                                      {
                                          id: {
                                              [Op.in]: sequelize.literal(`
                                                  SELECT user_id
                                                  FROM curso_user
                                                  WHERE curso_id IN (
                                                      SELECT curso_id
                                                      FROM curso_user
                                                      WHERE user_id = ${user.id}
                                                  )
                                              `),
                                          },
                                      },
                                      {
                                          role: {
                                              [Op.in]: [
                                                  "academico",
                                                  "administracion",
                                                  "super-admin",
                                              ],
                                          },
                                      },
                                  ],
                              }
                            : {}),
                    };
                }

                const data = await Promise.all([
                    UserEntity.findAll({
                        offset,
                        limit,
                        order: Object.entries(resto) as unknown as string[],
                        attributes: {
                            exclude: ["password"],
                        },
                        where: {
                            ...where,
                            ...orWhereUser(search || ""),
                        },
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
                    }),
                    UserEntity.count({
                        where: {
                            ...where,
                            ...orWhereUser(search || ""),
                        },
                    }),
                ]);

                return data;
            },
        });
        return result;
    }

    async store(user: UserAuth | null, body: UserStoreDto) {
        const code = await generateCodeEntity(UserEntity, "code", "USER-");
        const slug = slugify(
            body.user_name ||
                `${body.full_name}${body.father_lastname}${generateId().slice(
                    -4,
                    4
                )}`
        );
        const usuario = new UserEntity({
            ...body,
            code,
            user_id: user?.id || null,
            intentos_session: 0,
            slug,
            enabled_notifications_webpush: true,
        });
        await usuario.save();
        return {
            success: true,
            user: usuario,
        };
    }
    async show(id: string) {
        const result = await userShow(id);
        if (!result) {
            throw new NotFoundException(
                `No se encontró un user con el id ${id}`
            );
        }
        return result;
    }
    async update(user: UserAuth, id: string, body: UserUpdateDto) {
        await UserEntity.update(
            {
                ...body,
                user_id: user.id,
            },
            { where: { id: Number(id) } }
        );
        return {
            success: true,
            message: "Usuario actualizado correctamente",
        };
    }

    async updatePassword(id: string, body: UserUpdatePasswordDto) {
        const salt = await bcrypt.genSalt();
        const password = await bcrypt.hash(body.repeat_password!, salt);
        await UserEntity.update({ password }, { where: { id: Number(id) } });
        return {
            success: true,
            message: "Contraseña actualizada correctamente",
        };
    }

    async destroy(id: string) {
        await UserEntity.destroy({
            where: { id: Number(id) },
        });
        return {
            success: true,
            message: "Usuario eliminado correctamente",
        };
    }

    async destroyUsers(ids: number[]) {
        const users = await UserEntity.destroy({
            where: { id: { [Op.in]: ids } },
        });
        return { success: true, users };
    }
}
