import { timestampsObject } from "@libs/index";
import { filesSchema } from "@services/uploads/schemas/uploads.schema";
import {
    array,
    boolean,
    type Input,
    maxLength,
    maxValue,
    minLength,
    minValue,
    nullable,
    number,
    object,
    string,
    toTrimmed,
} from "@vigilio/valibot";
import { BrandSchema } from "./brand.schema";
import { CategorySchema } from "./category.schema";
import { FeaturesSchema } from "./options/feature.schema";
import { OptionsSchema } from "./options/option.schema";
import { VariantSchema } from "./options/variant.schema";

export const productImagesQualities = [100, 500];

export const productNormalSchema = object({
    id: number(),
    product_code: string([toTrimmed(), minLength(1), maxLength(30)]),
    name: string([toTrimmed(), minLength(1), minLength(3), maxLength(255)]),
    description: nullable(string([toTrimmed()])), // descripcion del producto
    characteristics: array(
        object({
            name: string([toTrimmed(), minLength(1)]),
            value: string([toTrimmed(), minLength(1)]),
        })
    ),
    enabled: boolean(), // esta disponible el producto?
    price: number([minValue(0)]), // precio
    discount: number([minValue(0), maxValue(100)]), //si tiene descuento
    slug: string([minLength(1), minLength(3), maxLength(255)]), // slug
    images: nullable(array(filesSchema(productImagesQualities))),
    category_id: number(),
    subcategory_id: nullable(number()),
    brand_id: nullable(number()),
    url: nullable(string()),
    enabled_local: boolean(),
    enabled_web: boolean(),
    cuota_config: nullable(
        object({
            interes_enabled: boolean(),
            price: nullable(number()),
            months: number(),
        })
    ),
    empresa_id: number(),
    ...timestampsObject.entries,
});

export type ProductNormalSchema = Input<typeof productNormalSchema> & {
    createdAt?: Date;
    updatedAt?: Date;
};
export type ProductNormalSchemaFromServer = ProductNormalSchema & {
    category: CategorySchema;
    brand: Pick<BrandSchema, "id" | "name">;
    options: (OptionsSchema & { features: FeaturesSchema[] })[];
    variants: (VariantSchema & {
        features: { option_id: number; id: number }[];
    })[];
};
