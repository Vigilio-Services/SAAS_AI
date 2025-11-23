import validFileValibot from "@libs/client/valibot";
import { extensions } from "@services/uploads/libs/client";
import {
    array,
    Input,
    instance,
    merge,
    object,
    omit,
    pick,
} from "@vigilio/valibot";
import { fileSchema } from "../schemas/file.schema";

export const fileStoreDto = omit(fileSchema, [
    "id",
    "history",
    "user_id",
    "empresa_id",
    "created_at",
    "updated_at",
]);

export type FileStoreDto = Input<typeof fileStoreDto>;

export const fileStoreClientDto = merge([
    fileStoreDto,
    object({
        file: array(instance(File), "Archivos no válidos.", [
            validFileValibot({
                required: true,
                min: 1,
                max: 1,
                types: Object.values(extensions).flat(),
                maxSize: 250, // 250MB
            }),
        ]),
    }),
]);

export type FileStoreClientDto = Input<typeof fileStoreClientDto>;

export const fileUpdateFileDto = pick(fileStoreClientDto, ["file"]);

export type FileUpdateClientDto = Input<typeof fileUpdateFileDto> & {
    name: string;
};
