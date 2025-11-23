import { timestampsObject } from "@libs/index";
import { filesSchema } from "@services/uploads/schemas/uploads.schema";
import { slug } from "@vigilio/express-core/helpers";
import {
    array,
    boolean,
    type Input,
    maxLength,
    minLength,
    nullable,
    number,
    object,
    startsWith,
    string,
    toTrimmed,
    transform,
} from "@vigilio/valibot";
export const categoryImageQualities = [100, 800];
export const categoryWallpaperQualities = [100, 1200];

export const categorySchema = object({
    id: number(),
    category_code: string([minLength(1), maxLength(30)]),
    name: string([toTrimmed(), minLength(1), minLength(3), maxLength(200)]),
    isService: boolean(),
    icon: nullable(
        string([
            toTrimmed(),
            minLength(1),
            minLength(3),
            maxLength(200),
            startsWith("<i class=", "Icono no válido"),
        ])
    ),
    slug: transform(
        string([toTrimmed(), minLength(1), minLength(3), maxLength(200)]),
        slug
    ),
    image: nullable(array(filesSchema(categoryImageQualities))),
    wallpaper: nullable(array(filesSchema(categoryWallpaperQualities))),
    empresa_id: number(),
    ...timestampsObject.entries,
});

export type CategorySchema = Input<typeof categorySchema>;
export type CategorySchemaFromServe = CategorySchema & {
    createdAt: Date;
    updatedAt: Date;
};
