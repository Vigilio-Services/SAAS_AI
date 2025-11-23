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
import { CategorySchema } from "./category.schema";
import { productImagesQualities } from "./product_normal.schema";

export const productRestaurantSchema = object({
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
    stock: nullable(number([minValue(0, "Minimo 0 cantidades.")])),
    ilimit: boolean(),
    discount: number([minValue(0), maxValue(100)]), //si tiene descuento
    url: nullable(string()),
    slug: string([minLength(1), minLength(3), maxLength(255)]), // slug
    images: nullable(array(filesSchema(productImagesQualities))),
    category_id: number(),
    subcategory_id: nullable(number()),
    empresa_id: number(),
    ...timestampsObject.entries,
});

export type ProductRestaurantSchema = Input<typeof productRestaurantSchema> & {
    createdAt?: Date;
    updatedAt?: Date;
};
export type ProductSchemaFromServer = ProductRestaurantSchema & {
    category: CategorySchema;
};
