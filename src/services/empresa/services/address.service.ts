import { UserAuth } from "@services/auth/dtos/auth.dto";
import { CityEntity } from "@services/ubigeo/entities/city.entity";
import { CountryEntity } from "@services/ubigeo/entities/country.entity";
import { RegionEntity } from "@services/ubigeo/entities/region.entity";
import { userModified } from "@services/user/libs/server";
import { Injectable } from "@vigilio/express-core";
import cache from "@vigilio/express-core/cache";
import { AddressStoreDto, AddressUpdateDto } from "../dtos/address.dto";
import { AddressEntity } from "../entitites/address.entity";
import { EmpresaSchemaFromServer } from "../schemas/empresa.schema";

@Injectable()
export class AddressService {
    async index(empresa: EmpresaSchemaFromServer) {
        const data = await AddressEntity.findAll({
            where: {
                empresa_id: empresa.id,
            },
            order: [["id", "DESC"]],
            include: [
                userModified("user"),
                {
                    model: CityEntity,
                    include: [
                        {
                            model: RegionEntity,
                            include: [{ model: CountryEntity }],
                        },
                    ],
                },
            ],

            raw: true,
            nest: true,
        });
        return { success: true, data };
    }
    async store(
        empresa: EmpresaSchemaFromServer,
        user: UserAuth,
        data: AddressStoreDto
    ) {
        const address = await AddressEntity.create({
            ...data,
            user_id: user.id,
            empresa_id: empresa.id,
        });
        return {
            success: true,
            address,
        };
    }
    async show(empresa: EmpresaSchemaFromServer, id: string) {
        const address = await AddressEntity.findOne({
            where: {
                empresa_id: empresa.id,
                id,
            },
            include: [
                userModified("user"),
                {
                    model: CityEntity,
                    include: [
                        {
                            model: RegionEntity,
                            include: [{ model: CountryEntity }],
                        },
                    ],
                },
            ],
            raw: true,
            nest: true,
        });
        return {
            success: true,
            address,
        };
    }
    async update(
        empresa: EmpresaSchemaFromServer,
        user: UserAuth,
        id: string,
        data: AddressUpdateDto
    ) {
        await AddressEntity.update(
            { ...data, user_id: user.id },
            {
                where: { empresa_id: empresa.id, id },
            }
        );
        cache.delete("empresa");
        return {
            success: true,
            message: "Addresso actualizado correctamente",
        };
    }
}
