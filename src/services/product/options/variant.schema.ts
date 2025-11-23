import {
    array,
    boolean,
    type Input,
    maxLength,
    minLength,
    minValue,
    nullable,
    number,
    object,
    string,
    toTrimmed,
} from "@vigilio/valibot";

export const variantSchema = object({
    id: number(),
    sku: nullable(string([toTrimmed(), minLength(3), maxLength(45)])),
    stock: nullable(number([minValue(0, "Minimo 0 cantidades.")])),
    ilimit: boolean(),
    images: array(number()),
    product_normal_id: nullable(number()),
    empresa_id: number(),
});
export type VariantSchema = Input<typeof variantSchema>;
