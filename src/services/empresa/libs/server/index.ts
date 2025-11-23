import * as fs from "node:fs";
import { formatDateTz } from "@libs/index";
import { FileEntity } from "@services/empresa/entitites/file.entity";
import { FileSchema } from "@services/empresa/schemas/file.schema";
import {
    fileExists,
    pathUploads,
} from "@services/uploads/libs/server/uploads.libs";
import cache from "@vigilio/express-core/cache";

export async function fileHistory(file: FileSchema) {
    // guardar en history
    const fileFound = `${pathUploads()}/${file.file[0].file}`;
    if (await fileExists(fileFound)) {
        // Cambiar nombre del archivo agregando (1) antes de la extensión
        const fileNameParts = file.file[0].file.split(".");
        const extension = fileNameParts.pop(); // Obtener la extensión
        const baseName = fileNameParts.join("."); // El resto del nombre (puede tener múltiples puntos)
        const newName = `${baseName}.${formatDateTz(
            new Date(),
            "DD_MM_YYYY_HH_mm_ss"
        )}.${extension}`;
        //  renombrear el archivo y mantenerle el nombre original
        await fs.promises.rename(fileFound, `${pathUploads()}/${newName}`);
        file.history = [newName, ...(file.history || [])];
        // agregar el nombre original al history
        await FileEntity.update(
            { history: file.history },
            { where: { id: file.id } }
        );
        cache.delete("files");
    }
}
