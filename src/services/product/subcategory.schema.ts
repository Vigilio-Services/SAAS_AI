import { timestampsObject } from "@libs/index";
import { filesSchema } from "@services/uploads/schemas/uploads.schema";
import { slug } from "@vigilio/express-core/helpers";
import {
    array,
    type Input,
    maxLength,
    minLength,
    nullable,
    number,
    object,
    string,
    toTrimmed,
    transform,
} from "@vigilio/valibot";

export const subcategoryImageQualities = [100, 800];
export const subcategorySchema = object({
    id: number(),
    subcategory_code: string([minLength(1), maxLength(30)]),
    name: string([toTrimmed(), minLength(1), minLength(3), maxLength(200)]),
    image: nullable(array(filesSchema(subcategoryImageQualities))),
    slug: transform(
        string([toTrimmed(), minLength(1), minLength(3), maxLength(200)]),
        slug
    ),
    category_id: number(),
    empresa_id: number(),
    ...timestampsObject.entries,
});

export type SubcategorySchema = Input<typeof subcategorySchema>;
