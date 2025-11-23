import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { dirMode } from "@config/server/const";
import { slugify } from "@libs/index";
import Logger from "@libs/server/logger";
import { logger } from "@vigilio/express-core/helpers";
import { type File as FileFormidable } from "formidable";
import sharp from "sharp";
import type { FilesSchema } from "../../schemas/uploads.schema";

/** entities  */
export type UploadsEntities =
    | "user"
    | "curso_multimedia"
    | "programa_educacion"
    | "email"
    | "clase"
    | "campania"
    | "asistencia"
    | "novedad"
    | "actividad_user"
    | "section"
    | "file"
    | "programa"
    | "programa_item"
    | "programa_subitem"
    | "chat"
    | "message"
    | "order"
    | "company"
    | "gnre";

export const uploadsEntities: UploadsEntities[] = [
    "user",
    "curso_multimedia",
    "programa_educacion",
    "email",
    "clase",
    "campania",
    "asistencia",
    "novedad",
    "actividad_user",
    "section",
    "file",
    "programa",
    "programa_item",
    "programa_subitem",
    "chat",
    "message",
    "order",
    "company",
    "gnre",
];

/**** properties about entities *****/
export type UploadsProperties =
    | "photo"
    | "image"
    | "image_mobile"
    | "certificado_example"
    | "wallpaper"
    | "wallpaper_mobile"
    | "brochure"
    | "files"
    | "diapositivas"
    | "justificacion_file"
    | "archivo"
    | "portada"
    | "videos"
    | "images"
    | "files"
    | "file_video"
    | "file"
    | "boucher_file"
    | "logo_facturacion"
    | "certificado_digital";
export const uploadsProperties: UploadsProperties[] = [
    "photo",
    "image",
    "image_mobile",
    "certificado_example",
    "wallpaper",
    "wallpaper_mobile",
    "brochure",
    "files",
    "diapositivas",
    "justificacion_file",
    "archivo",
    "portada",
    "videos",
    "images",
    "files",
    "file_video",
    "file",
    "boucher_file",
    "certificado_digital",
    "logo_facturacion",
];

interface uploadFilesProps {
    files: FileFormidable[];
    name?: string;
    entity: UploadsEntities;
    qualities: number[] | null;
    directory?: string;
}
export async function uploadFiles({
    files,
    entity,
    name,
    qualities,
    directory = "/files",
}: uploadFilesProps) {
    let filesNames: FilesSchema[] = [];
    const dirEmpresa = pathUploads();
    const dir = `${dirEmpresa}/${directory}`;
    const dirEntity = `${dir}/${entity}`;
    const dirEmpresaExists = await fileExists(dirEmpresa);
    const dirExists = await fileExists(dir);
    const dirEntityExists = await fileExists(dirEntity);
    if (!dirEmpresaExists) {
        await fs.promises.mkdir(dirEmpresa);
        Logger.info("Creado directorio correctamente");
    }
    if (!dirExists) {
        await fs.promises.mkdir(dir);
        Logger.info("Creado directorio correctamente");
    }
    if (!dirEntityExists) {
        await fs.promises.mkdir(dirEntity);
        Logger.info("Creado directorio correctamente");
    }
    const fileArray = Array.isArray(files) ? files : [files]; // Ensure it's an array of files

    for await (const file of fileArray) {
        if (qualities && file.mimetype?.startsWith("image")) {
            for await (const quality of qualities) {
                const fileName = `${
                    name ? slugify(name) : crypto.randomUUID()
                }x${quality}.${Date.now().toString(32).substring(4)}.webp`;
                filesNames = [
                    ...filesNames,
                    {
                        file: `${directory.slice(1)}/${entity}/${fileName}`,
                        dimension: quality,
                        name:
                            file.originalFilename ||
                            `unknown.${file.originalFilename
                                ?.split(".")
                                .at(-1)}`,
                        size: file.size,
                    },
                ];
                await sharp(file.filepath)
                    .resize(quality)
                    .webp({ quality: 80 })
                    .toFile(path.resolve(dirEntity, fileName));
            }
        } else {
            const ext = file.originalFilename?.split(".").at(-1);
            const fileName = `${
                name ? slugify(name) : crypto.randomUUID()
            }.${Date.now().toString(32).substring(4)}.${ext}`;

            await fs.promises.chmod(dirEntity, 0o755);
            const fileexist = path.resolve(dirEntity, fileName);

            await optimizedMove(file.filepath, fileexist);

            filesNames = [
                ...filesNames,
                {
                    file: `${directory.slice(1)}/${entity}/${fileName}`,
                    name:
                        file.originalFilename ||
                        `unknown.${file.originalFilename?.split(".").at(-1)}`,
                    size: file.size,
                },
            ];
        }
    }

    return filesNames;
}
export function pathUploads() {
    return `${dirMode}/public/cear_latinoamericano`;
}
export async function fileExists(path: string) {
    try {
        await fs.promises.access(path);
        return true;
    } catch {
        return false;
    }
}
export async function removeFile(files: FilesSchema[]) {
    try {
        for (const file of files) {
            const image = `${pathUploads()}/${file.file}`;
            if (await fileExists(image)) {
                await fs.promises.unlink(image);
            }
        }
    } catch (error) {
        logger.error((error as Error).message);
    }
}

export async function optimizedMove(oldPath: string, newPath: string) {
    return new Promise((resolve, reject) => {
        const readStream = fs.createReadStream(oldPath);
        const writeStream = fs.createWriteStream(newPath);
        readStream.pipe(writeStream);
        writeStream.on("finish", async () => {
            try {
                await fs.promises.unlink(oldPath);
                resolve(true);
            } catch (error) {
                reject(error);
            }
        });
        readStream.on("error", reject);
        writeStream.on("error", reject);
    });
}

export const extensions: Record<
    "video" | "image" | "document" | "compressed" | "audio",
    string[]
> = {
    video: [
        "video/mp4",
        "video/x-msvideo",
        "video/webm",
        "video/mpeg",
        "video/3gpp",
    ],
    audio: ["audio/mpeg", "audio/wav", "audio/aac", "audio/flac", "audio/ogg"],
    compressed: [
        "application/zip",
        "application/x-rar-compressed",
        "application/x-7z-compressed",
        "application/x-tar",
        "application/gzip",
        "application/x-bzip2",
        "application/x-xz",
        "application/x-iso9660-image",
        "application/java-archive",
        "application/gzip",
    ],
    image: [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/svg+xml",
        "image/webp",
    ],
    document: [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-powerpoint",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "text/plain",
        "application/rtf",
        "application/vnd.oasis.opendocument.text",
        "application/vnd.oasis.opendocument.spreadsheet",
        "application/vnd.oasis.opendocument.presentation",
        "text/csv",
    ],
};
