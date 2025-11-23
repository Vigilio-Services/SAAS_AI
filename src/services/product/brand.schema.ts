import { timestampsObject } from "@libs/index";
import { filesSchema } from "@services/uploads/schemas/uploads.schema";
import {
    array,
    type Input,
    maxLength,
    minLength,
    nullable,
    number,
    object,
    string,
} from "@vigilio/valibot";

export const brandImageQualities = [100, 500];

export const brandSchema = object({
    id: number(),
    name: string([minLength(2), maxLength(100)]),
    brand_code: string(),
    slug: string([minLength(2), maxLength(100)]),
    image: nullable(array(filesSchema(brandImageQualities))),
    empresa_id: number(),
    ...timestampsObject.entries,
});
export type BrandSchema = Input<typeof brandSchema>;
export type BrandSchemaFromServe = BrandSchema & {
    createdAt: Date;
    updatedAt: Date;
};
