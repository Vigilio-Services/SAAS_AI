import { formatDateTzUTC } from "@libs/index";
import Logger from "@libs/server/logger";
import { InteligenciaArtificialEntity } from "@services/ai/entities/inteligencia_artificial.entity";
import { InteligenciaArtificialQuestionEntity } from "@services/ai/entities/inteligencia_artificial_question.entity";
import { WhatsappEntity } from "@services/ai/entities/whatsapp.entity";
import { WhatsappContactEntity } from "@services/ai/entities/whatsapp_contact.entity";
import { WhatsappGroupEntity } from "@services/ai/entities/whatsapp_group.entity";
import { WhatsappGroupMemberEntity } from "@services/ai/entities/whatsapp_group_member.entity";
import { AddressEntity } from "@services/empresa/entitites/address.entity";
import { CompanyEntity } from "@services/empresa/entitites/company.entity";
import { EmpresaEntity } from "@services/empresa/entitites/empresa.entity";
import { EmpresaHostEntity } from "@services/empresa/entitites/empresa_host.entity";
import { EmpresaPaymentEntity } from "@services/empresa/entitites/empresa_payment.entity";
import { EmpresaRastreoEntity } from "@services/empresa/entitites/empresa_rastreo.entity";
import { EmpresaServiceEntity } from "@services/empresa/entitites/empresa_service.entity";
import { FileEntity } from "@services/empresa/entitites/file.entity";
import { MetodoPagoEntity } from "@services/empresa/entitites/metodo_pago.entity";
import { SettingEntity } from "@services/empresa/entitites/setting.entity";
import { TipoEmpresaEntity } from "@services/empresa/entitites/tipo_empresa.entity";
import { TipoServicioEntity } from "@services/empresa/entitites/tipo_servicio.entity";
import { EmpresaSchemaFromServer } from "@services/empresa/schemas/empresa.schema";
import { CityEntity } from "@services/ubigeo/entities/city.entity";
import { CountryEntity } from "@services/ubigeo/entities/country.entity";
import { RegionEntity } from "@services/ubigeo/entities/region.entity";
import { UserEntity } from "@services/user/entities/user.entity";
import { Sequelize } from "sequelize-typescript";
import enviroments from "./environments.config";

// biome-ignore lint: TODOS LOS DECIMALES de texto a float
(Sequelize as any).DataTypes.postgres.DECIMAL.parse = Number.parseFloat;

const sequelize = new Sequelize({
    dialect: "postgres",
    host: enviroments.DB_HOST,
    username: enviroments.DB_USER,
    password: enviroments.DB_PASS,
    database: enviroments.DB_NAME,
    // port: enviroments.DB_PORT,
    pool: {
        max: 50,
        min: 15,
        acquire: 30000,
        idle: 30000,
        evict: 10000,
    },
    retry: {
        max: 3, // Intentar reconectar 3 veces
        match: [
            /SequelizeConnectionError/,
            /SequelizeConnectionRefusedError/,
            /SequelizeHostNotFoundError/,
            /SequelizeHostNotReachableError/,
            /SequelizeInvalidConnectionError/,
            /SequelizeConnectionTimedOutError/,
        ],
    },
    dialectOptions: {
        useUTC: true, // Para MySQL/MariaDB
        timezone: "Etc/UTC",
        connectTimeout: 10000, // 10 segundos para conexión inicial
    },
    timezone: "+00:00",
    define: {
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
        underscored: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
    },
    hooks: {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        beforeSave: (instance, options: any) => {
            const { _timezone: timezone } = options;

            if (timezone) {
                // Crear copia profunda para evitar mutaciones directas
                instance.dataValues = convertDates(
                    { ...instance.dataValues },
                    timezone
                );
            }
        },
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        beforeUpdate: (instance, options: any) => {
            const { _timezone: timezone } = options;
            if (timezone) {
                instance.dataValues = convertDates(
                    { ...instance.dataValues },
                    timezone
                );
            }
        },
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        beforeBulkCreate: (instances, options: any) => {
            const { _timezone: timezone } = options;

            if (timezone) {
                for (const instance of instances) {
                    // Crear copia profunda para evitar mutaciones directas
                    const date = convertDates(
                        { ...instance.dataValues },
                        timezone
                    );

                    instance.dataValues = date;
                }
            }
        },
    },
});
function convertDates<T>(obj: T, timezone: string): T {
    // 1. Si es una fecha, formatear
    if (obj instanceof Date) {
        const date = formatDateTzUTC(obj, {
            timezone,
        } as EmpresaSchemaFromServer).format() as unknown as T;
        return date;
    }

    // 2. Si es un array, procesar cada elemento
    if (Array.isArray(obj)) {
        return obj.map((item) => convertDates(item, timezone)) as unknown as T;
    }

    // 3. Si es un objeto (no Date ni Array), procesar propiedades
    if (obj && typeof obj === "object") {
        const result = {} as Record<string, unknown>;

        for (const key of Object.keys(obj)) {
            result[key] = convertDates(
                (obj as Record<string, unknown>)[key],
                timezone
            );
        }

        return result as T;
    }

    // 4. Para cualquier otro tipo, devolver sin cambios
    return obj;
}
sequelize.addModels([
    CountryEntity,
    RegionEntity,
    CityEntity,
    TipoEmpresaEntity,
    TipoServicioEntity,
    EmpresaEntity,
    EmpresaPaymentEntity,
    EmpresaServiceEntity,
    EmpresaRastreoEntity,
    EmpresaHostEntity,
    MetodoPagoEntity,
    SettingEntity,
    CompanyEntity,
    AddressEntity,
    WhatsappEntity,
    WhatsappGroupEntity,
    WhatsappContactEntity,
    WhatsappGroupMemberEntity,
    InteligenciaArtificialEntity,
    InteligenciaArtificialQuestionEntity,
    FileEntity,
    UserEntity,
]);

export async function connectDB() {
    try {
        Logger.info("Intentando autenticar con la base de datos...");
        await sequelize.authenticate({
            logging: (sql, timing) => {
                Logger.debug(`SQL: ${sql}`);
                if (timing) {
                    Logger.debug(`Tiempo de ejecución: ${timing}ms`);
                }
            },
        });
        await sequelize.sync({ alter: true });
        Logger.info(
            "Conexión a la base de datos establecida correctamete http://localhost:4000/api/seed"
        );
    } catch (error) {
        Logger.error(
            `Error al conectar con la base de datos: ${
                error instanceof Error ? error.message : "Unknown error"
            }`
        );
        throw error;
    }
}

export { sequelize };
