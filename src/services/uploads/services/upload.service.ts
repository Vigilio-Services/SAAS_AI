import { RequestVigilio } from "@config/server/const";
import { UserAuth } from "@services/auth/dtos/auth.dto";
import { UserEntity } from "@services/user/entities/user.entity";
import { BadRequestException, Injectable } from "@vigilio/express-core";
import cache from "@vigilio/express-core/cache";
import {
    type ValidationProps,
    validateUpload,
} from "@vigilio/express-core/helpers";
import type { Request } from "express";
import type { File } from "formidable";
import { CompanyEntity } from "../../empresa/entitites/company.entity";
import {
    extensions,
    removeFile,
    type UploadsEntities,
    type UploadsProperties,
    uploadFiles,
} from "../libs/server/uploads.libs";

@Injectable()
export class UploadsService {
    async store(props: {
        req: Request;
        entity: UploadsEntities;
        property: UploadsProperties;
    }) {
        const { entity, property } = props;
        const { files, filesName } = props.req as Request & {
            files: File[];
            filesName: string;
            // user: UserAuth;
        };
        let qualities = {} as { qualities: number[] | null; directory: string };
        const name = filesName;

        switch (entity) {
            case "user": {
                if (property === "photo") {
                    qualities = await this.customUpload(
                        files,
                        { maxFiles: 1, required: true },
                        [100, 500]
                    );
                }
                break;
            }

            case "email": {
                if (property === "files") {
                    qualities = await this.customUpload(
                        files,
                        {
                            maxFiles: 6,
                            required: true,
                            typeFile: { value: extensions.document },
                        },
                        null
                    );
                }
                if (property === "videos") {
                    qualities = await this.customUpload(
                        files,
                        {
                            maxFiles: 6,
                            required: true,
                            typeFile: { value: extensions.video },
                        },
                        null
                    );
                }
                if (property === "images") {
                    qualities = await this.customUpload(
                        files,
                        {
                            maxFiles: 6,
                            required: true,
                            typeFile: { value: extensions.image },
                        },
                        null
                    );
                }
                break;
            }
            case "asistencia": {
                if (property === "justificacion_file") {
                    qualities = await this.customUpload(
                        files,
                        {
                            maxFiles: 1,
                            required: true,
                            typeFile: {
                                value: Object.values(extensions).flat(),
                            },
                        },
                        null
                    );
                }
                break;
            }

            case "file": {
                if (property === "file") {
                    qualities = await this.customUpload(
                        files,
                        {
                            maxFiles: 1,
                            required: true,
                            typeFile: {
                                value: Object.values(extensions).flat(),
                            },
                        },
                        null
                    );
                }
                break;
            }
            case "chat": {
                if (property === "photo") {
                    qualities = await this.customUpload(
                        files,
                        { maxFiles: 1, required: true },
                        [100, 500]
                    );
                }
                break;
            }
            case "message": {
                if (property === "files") {
                    qualities = await this.customUpload(
                        files,
                        {
                            maxFiles: 6,
                            required: true,
                            typeFile: {
                                value: [
                                    ...extensions.document,
                                    ...extensions.compressed,
                                    ...extensions.image,
                                    ...extensions.video,
                                    ...extensions.audio,
                                ],
                            },
                        },
                        null
                    );
                }
                break;
            }
            case "order": {
                if (property === "boucher_file") {
                    qualities = await this.customUpload(
                        files,
                        {
                            maxFiles: 1,
                            required: true,
                            typeFile: {
                                value: [...extensions.image],
                            },
                        },
                        [800]
                    );
                }
                break;
            }
            case "company": {
                if (property === "certificado_digital") {
                    qualities = await this.customUpload(
                        files,
                        {
                            minFiles: 1,
                            maxFiles: 1,
                            required: true,
                            typeFile: {
                                value: [
                                    "application/x-pkcs12",
                                    "application/x-x509-ca-cert",
                                    "application/octet-stream",
                                ],
                            },
                        },
                        null
                    );
                }
                if (property === "logo_facturacion") {
                    qualities = await this.customUpload(
                        files,
                        {
                            minFiles: 1,
                            maxFiles: 1,
                            required: true,
                        },
                        [300]
                    );
                }
                break;
            }
            default: {
                throw new BadRequestException(
                    "Error server, comunicarse con desarrollador"
                );
            }
        }

        const responseFile = await uploadFiles({
            files,
            entity: entity as UploadsEntities,
            name,
            ...qualities,
        });

        return {
            success: true,
            files: responseFile,
        };
    }
    async update(props: {
        req: Request;
        id: string;
        entity: UploadsEntities;
        property: UploadsProperties;
    }) {
        const { entity, property, id } = props;
        const { files, user } = props.req as RequestVigilio & {
            files: File[];
            filesName: string;
            user: UserAuth;
        };
        let entidad: null | unknown = null;
        switch (entity) {
            case "user": {
                const usuario = await UserEntity.findByPk(id, {
                    raw: true,
                    attributes: ["id", "photo"],
                });
                if (!usuario) {
                    throw new BadRequestException("User no encontrado");
                }
                if (
                    user.id !== usuario.id &&
                    !["super-admin", "academico"].includes(user.role)
                ) {
                    throw new BadRequestException(
                        "No tienes permisos para actualizar la foto de perfil"
                    );
                }
                entidad = UserEntity;
                if (property === "photo" && user.photo) {
                    await removeFile(user.photo);
                }
                cache.delete(`user:${user.id}`);
                break;
            }
            case "company": {
                const company = await CompanyEntity.findByPk(id, {
                    raw: true,
                    attributes: [
                        "id",
                        "logo_facturacion",
                        "certificado_digital",
                    ],
                });
                if (!company) {
                    throw new BadRequestException("message no encontrado");
                }
                entidad = CompanyEntity;
                cache.delete("empresa");
                if (
                    property === "certificado_digital" &&
                    company.certificado_digital
                ) {
                    await removeFile(company.certificado_digital);
                }
                if (
                    property === "logo_facturacion" &&
                    company.logo_facturacion
                ) {
                    await removeFile(company.logo_facturacion);
                }
                break;
            }
            default: {
                throw new BadRequestException(
                    "Error server, comunicarse con desarrollador"
                );
            }
        }
        let filesFoto: unknown | null = null;

        if (files) {
            const { files: responseFile } = await this.store({
                req: props.req,
                entity,
                property,
            });
            filesFoto = responseFile;
        }

        /*
        type here is so difficult but  i know that you understand me
        */

        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        await (entidad as any).update(
            {
                [property]: filesFoto,
            },
            { where: { id } }
        );

        return {
            success: true,
            files: filesFoto,
        };
    }
    async customUpload(
        files: File[],
        validation: ValidationProps,
        qualities: number[] | null,
        directory = "/files"
    ) {
        try {
            await validateUpload(files, validation);
            return { qualities, directory };
        } catch (error) {
            throw new BadRequestException(error as string);
        }
    }
}
