import { RequestVigilio } from "@config/server/const";
import { sequelize } from "@config/server/db.config";
import { bulkCreateWithNestedRelations } from "@libs/server/helpers";
import Logger from "@libs/server/logger";
import { AddressEntity } from "@services/empresa/entitites/address.entity";
import { CompanyEntity } from "@services/empresa/entitites/company.entity";
import { EmpresaEntity } from "@services/empresa/entitites/empresa.entity";
import { EmpresaPaymentEntity } from "@services/empresa/entitites/empresa_payment.entity";
import { FileEntity } from "@services/empresa/entitites/file.entity";
import { SettingEntity } from "@services/empresa/entitites/setting.entity";
import { TipoEmpresaEntity } from "@services/empresa/entitites/tipo_empresa.entity";
import { TipoServicioEntity } from "@services/empresa/entitites/tipo_servicio.entity";
import { countries } from "@services/empresa/libs/country";
import { EmpresaPaymentSchema } from "@services/empresa/schemas/empresa_payment.schema";
import { empresaSeeder } from "@services/empresa/seeders/empresa.seeder";
import { fileSeeder } from "@services/empresa/seeders/file.seeder";
import { settingSeeder } from "@services/empresa/seeders/setting.seeder";
import { tipo_servicio_seeder } from "@services/empresa/seeders/tipo_empresa.seeder";
import { ubigeoSeeder } from "@services/ubigeo/seeder";
import { UserEntity } from "@services/user/entities/user.entity";
import { userSeeder } from "@services/user/seeders/user.seeder";
import {
    Injectable,
    InternalServerErrorException,
} from "@vigilio/express-core";
import cache from "@vigilio/express-core/cache";

@Injectable()
export class SeederService {
    async store(_: RequestVigilio) {
        try {
            // if (req.empresa) {
            //     // const files = await fileSeeder();
            //     // await Promise.all([
            //     //     FileEntity.bulkCreate(
            //     //         files.map((file) => ({
            //     //             name: file.name,
            //     //             file: [file],
            //     //             history: [],
            //     //             user_id: 1,
            //     //         }))
            //     //     ),
            //     // ]);
            //     // cache.delete("files");
            //     return {
            //         success: true,
            //         message: "SEED EXECUTED FILES",
            //     };
            // }

            await sequelize.sync({ force: true });
            await ubigeoSeeder();
            // ubigeo
            await bulkCreateWithNestedRelations(
                {
                    model: TipoServicioEntity,
                    data: tipo_servicio_seeder,
                    excludeFields: ["empresas", "label"],
                    beforeCreate: (tipo_servicio) => ({
                        ...tipo_servicio,
                    }),
                },
                [
                    {
                        childrenField: "empresas",
                        relationField: "tipo_servicio_id",
                        config: { model: TipoEmpresaEntity },
                    },
                ]
            );
            await UserEntity.bulkCreate(userSeeder());

            const [empresa] = await Promise.all([
                EmpresaEntity.create({ ...empresaSeeder, user_id: 1 }),
            ]);
            const country = countries.find(
                (country) => country.dial_code === empresa.dial_code
            )!;
            await Promise.all([
                AddressEntity.create({
                    city_id: 1,
                    cod_local: "0",
                    direccion:
                        "Av. Faustino Sánchez Carrión 615 Edificio Vértice 22, Oficina 306 ",
                    ubigeo: "12345",
                    urbanizacion: "Faustino Sánchez Carrión",
                    user_id: 1,
                    enabled: true,
                    empresa_id: empresa.id,
                }),
                SettingEntity.create(settingSeeder),
                CompanyEntity.create({
                    certificado_digital: [
                        {
                            file: "https://cearlatinoamericano.pe/images/settings/logo-white.webp",
                            name: "logo",
                            size: 100,
                        },
                    ],
                    logo_facturacion: [
                        {
                            file: "https://cearlatinoamericano.pe/images/settings/logo-white.webp",
                            name: "logo",
                            size: 100,
                        },
                    ],
                    production: false,
                    nombre_comercial: "CEAR LATINOAMERICANO",
                    razon_social: "CEAR LATINOAMERICANO S.A.C",
                    ruc: "10706020638",
                    sol_pass: "DD00",
                    sol_user: "DD00",
                    certificado_password: null,
                    client_id: null,
                    client_secret: null,
                    user_id: 1,
                    empresa_id: empresa.id,
                }),
                EmpresaPaymentEntity.create({
                    empresa_id: empresa.id,
                    user_id: 1,
                    bancos: ["bcp", "interbank", "bbva"],
                    enabled_client_pay_comision: false,
                    enabled_dni_cart: true,
                    enabled_igv: true,
                    enabled_sell_country: true,
                    igv: 18,
                    is_dolar: true,
                    money: {
                        international_simbolo: country.international_simbolo,
                        money: country.money,
                        simbolo: country.simbolo,
                    },
                    impuesto_value: country.impuestos,
                    tipo_impuesto: country.tipo_impuesto,
                } as Omit<EmpresaPaymentSchema, "id">),
            ]);

            const files = await fileSeeder();

            await Promise.all([
                FileEntity.bulkCreate(
                    files.map((file) => ({
                        name: file.name,
                        file: [file],
                        history: [],
                        user_id: 1,
                        empresa_id: empresa.id,
                    }))
                ),
            ]);
            cache.delete("files");
            cache.delete("clases-types");
            cache.delete("actividades-types");
            cache.delete("empresa");
            cache.delete("latest-campaña");
            cache.delete("novedad-categories");
            cache.delete("novedad-types");
            cache.delete("novedad");
            cache.delete("feriados");
            cache.delete("icons");
            cache.delete("curso_types");
            return { success: true, message: "SEED DEVELOPMENT EXECUTED" };
        } catch (error) {
            Logger.error(JSON.stringify((error as Error).message));
            throw new InternalServerErrorException(
                JSON.stringify({ error }, null, 3)
            );
        }
    }
}
