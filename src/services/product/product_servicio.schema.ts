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

export const productServicioSchema = object({
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
    images: nullable(array(filesSchema(productImagesQualities))),
    url: nullable(string()),
    slug: string([minLength(1), minLength(3), maxLength(255)]), // slug
    category_id: number(),
    empresa_id: number(),
    days: array(
        object({
            days: number([minValue(1)]),
            cantidad: number([minValue(0.1)]),
            name: string([minLength(3)]),
        })
    ),
    showHorario: boolean(),
    ...timestampsObject.entries,
});

export type ProductServicioSchema = Input<typeof productServicioSchema> & {
    createdAt?: Date;
    updatedAt?: Date;
};
export type ProductSchemaFromServer = ProductServicioSchema & {
    category: CategorySchema;
};
