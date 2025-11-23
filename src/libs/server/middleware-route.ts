import { RequestVigilio } from "@config/server/const";
import enviroments from "@config/server/environments.config";
import { AddressEntity } from "@services/empresa/entitites/address.entity";
import { CompanyEntity } from "@services/empresa/entitites/company.entity";
import { EmpresaEntity } from "@services/empresa/entitites/empresa.entity";
import { EmpresaHostEntity } from "@services/empresa/entitites/empresa_host.entity";
import { EmpresaPaymentEntity } from "@services/empresa/entitites/empresa_payment.entity";
import { EmpresaRastreoEntity } from "@services/empresa/entitites/empresa_rastreo.entity";
import { EmpresaServiceEntity } from "@services/empresa/entitites/empresa_service.entity";
import { MetodoPagoEntity } from "@services/empresa/entitites/metodo_pago.entity";
import { SettingEntity } from "@services/empresa/entitites/setting.entity";
import { TipoEmpresaEntity } from "@services/empresa/entitites/tipo_empresa.entity";
import { EmpresaSchemaFromServer } from "@services/empresa/schemas/empresa.schema";
import { CityEntity } from "@services/ubigeo/entities/city.entity";
import { CountryEntity } from "@services/ubigeo/entities/country.entity";
import { RegionEntity } from "@services/ubigeo/entities/region.entity";
import { userModified } from "@services/user/libs/server";
import { NextFunction } from "@vigilio/express-core";
import cache from "@vigilio/express-core/cache";
import { type Request, type Response } from "express";
import {
    BaseError,
    ConnectionError,
    ConnectionRefusedError,
    DatabaseError,
    ExclusionConstraintError,
    ForeignKeyConstraintError,
    TimeoutError,
    UniqueConstraintError,
    ValidationError,
} from "sequelize";
import { capitalize } from "..";
import { cacheGetJson, cacheTimes } from "./helpers";
import Logger from "./logger";

export async function middlewareRoute(req: Request, res: Response) {
    // Log the error with fallback values
    Logger.error(`Error en la aplicación: ${req.path}`);
    if (req.path.includes("/api")) {
        return res.status(404).json({
            error: 404,
            success: false,
            message: "This endpoint is not correct",
        });
    }
    res.redirect("/404");
}

export function errorHandlerMiddleware(
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    err: any,
    _: Request,
    res: Response,
    _2: NextFunction
) {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    function buildResponse(err: any, message: string, body = {}) {
        return {
            success: false,
            message,
            body,
            ...(process.env.NODE_ENV === "development" && {
                stack: err.stack,
                details: err.errors,
            }),
        };
    }
    if (err instanceof UniqueConstraintError) {
        const e = err.errors?.[0] || {};
        const value = err.errors?.[0]?.value || "unknown_value";
        return res
            .status(400)
            .json(
                buildResponse(
                    err,
                    `El valor ${value} ya existe. Por favor, ingresa uno diferente.`,
                    e.path || {}
                )
            );
    }

    if (err instanceof ValidationError) {
        const errors =
            err.errors?.map((e) => ({
                field: e.path,
                message: e.message,
                value: e.value,
                validator: e.validatorKey,
            })) ?? [];
        return res.status(400).json(
            buildResponse(err, "Error de validación en los datos", {
                errors,
            })
        );
    }

    if (err instanceof ForeignKeyConstraintError)
        return res.status(400).json(
            buildResponse(
                err,
                `Esto ya tiene elementos relacionados, eliminalos primero.  ${
                    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                    capitalize((err.original as any).table)
                } - ${capitalize(err.table || "")}`,
                {
                    table: err.table,
                    fields: err.fields,
                    errorType: "FOREIGN_KEY_CONSTRAINT",
                }
            )
        );

    if (err instanceof ConnectionError || err instanceof ConnectionRefusedError)
        return res.status(503).json(
            buildResponse(err, "Error de conexión con la base de datos", {
                errorType: "DATABASE_CONNECTION_ERROR",
            })
        );

    if (err instanceof TimeoutError)
        return res.status(504).json(
            buildResponse(err, "Timeout en la operación de base de datos", {
                errorType: "DATABASE_TIMEOUT",
            })
        );

    if (err instanceof DatabaseError)
        return res.status(500).json(
            buildResponse(err, "Error interno de base de datos", {
                originalError: err.original?.message,
                sql: err.sql,
                errorType: "DATABASE_ERROR",
            })
        );

    if (err instanceof ExclusionConstraintError)
        return res.status(400).json(
            buildResponse(err, "Violación de constraint de exclusión", {
                constraint: err.constraint,
                table: err.table,
                errorType: "EXCLUSION_CONSTRAINT",
            })
        );

    if (err instanceof TypeError)
        return res.status(400).json(
            buildResponse(err, "Tipo de dato incorrecto", {
                body: err.name,
            })
        );

    if (err instanceof BaseError)
        return res.status(500).json(
            buildResponse(err, "Error inesperado de base de datos", {
                name: err.name,
                message: err.message,
                errorType: "SEQUELIZE_ERROR",
            })
        );

    Logger.error(`Error global: ${err.message}`);

    return res
        .status(err.status || 500)
        .json(
            buildResponse(
                err,
                err.errors?.[0]?.message ||
                    err.message ||
                    "Error interno del servidor"
            )
        );
}

export async function middlewareInitialCache(
    req: Request,
    _2: Response,
    next: NextFunction
) {
    // const host = req.headers.host;
    // let subdomain: string | null = null;
    // if (host?.includes(".")) {
    //     subdomain = !host?.startsWith("www.") ? `www.${host}` : host;
    //     subdomain = subdomain.slice(4);

    //     const subdomainSplit = subdomain?.split("."); // Obtiene el subdominio
    //     if (enviroments.NODE_ENV === "production") {
    //         if (subdomainSplit?.length === 3) {
    //             subdomain = subdomainSplit[0];
    //             // puede ser que el dominio sea vigilio-services.com.net
    //             if (subdomainSplit[1] === "com") {
    //                 subdomain = null;
    //             }

    //             // if (
    //             //     enviroments.CLIENT.toLowerCase() ===
    //             //     subdomain?.toLowerCase()
    //             // ) {
    //             //     return next();
    //             // }
    //         } else {
    //             subdomain = null;
    //         }
    //     } else {
    //         subdomain = subdomainSplit[0];
    //     }

    //     if (
    //         subdomain === "vigilio-services" ||
    //         subdomain?.includes(".docker") ||
    //         subdomain === "facturacion"
    //     ) {
    //         return null;
    //     }
    // }
    // if (req.originalUrl === "/") {
    //     return res.redirect("/empresa");
    // }
    // cachear por que esto no se modifican mucho y es un dato que se usa en muchas partes para mejor rendimiento y velocidad CACHEamos ESTO
    let empresa: EmpresaSchemaFromServer | null = cacheGetJson("empresa");

    if (!empresa) {
        empresa = (await EmpresaEntity.findByPk(1, {
            raw: true,
            nest: true,
            include: [
                userModified("user"),
                {
                    model: CompanyEntity,
                    // attributes: {
                    //     exclude: [
                    //         "certificado_digital",
                    //         "certificado_password",
                    //         "client_id",
                    //         "client_secret",
                    //         "sol_pass",
                    //     ] satisfies (keyof CompanySchema)[],
                    // },
                },
                {
                    model: AddressEntity,
                    include: [
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
                },
                CompanyEntity,
                AddressEntity,
                SettingEntity,
                EmpresaRastreoEntity,
                EmpresaServiceEntity,
                EmpresaPaymentEntity,
                TipoEmpresaEntity,
                EmpresaHostEntity,
                MetodoPagoEntity,
                SettingEntity,
            ],
        })) as EmpresaSchemaFromServer;

        if (!empresa) {
            return next();
        }

        cache.set("empresa", JSON.stringify(empresa), cacheTimes.days3);
    }
    (req as RequestVigilio).empresa = empresa;
    next();
}
