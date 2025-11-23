import { array, type Input, number, object } from "@vigilio/valibot";

export const productsOptionsSchema = object({
    product_normal_id: number(),
    option_id: number(),
    features: array(number()),
    empresa_id: number(),
});
export type ProductsOptionsSchema = Input<typeof productsOptionsSchema>;
