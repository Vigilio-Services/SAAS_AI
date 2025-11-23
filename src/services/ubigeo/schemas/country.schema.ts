import {
    type Input,
    literal,
    number,
    object,
    string,
    union,
} from "@vigilio/valibot";

export const countrySchema = object({
    id: number(),
    code: string(),
    name: string(),
    dial_code: union([
        literal("52"),
        literal("57"),
        literal("56"),
        literal("598"),
        literal("55"),
        literal("51"),
        literal("593"),
        literal("34"),
        literal("54"),
    ]),
});
export type CountrySchema = Input<typeof countrySchema>;
