import { timestampsObject } from "@libs/index";
import {
    array,
    coerce,
    date,
    type Input,
    maxLength,
    maxValue,
    minLength,
    minValue,
    number,
    object,
    string,
    toTrimmed,
} from "@vigilio/valibot";

export const couponsSchema = object({
    id: number(),
    coupon: string([toTrimmed(), minLength(6), maxLength(20)]),
    discount: number([
        minValue(0, "Minímo 0%."),
        maxValue(100, "Máximo 100%."),
    ]),
    max_use: number([minValue(0), maxValue(100)]),
    date: coerce(date(), (value) => new Date(value as string)),
    categories: array(number(), [minLength(1)]),
    empresa_id: number(),
    ...timestampsObject.entries,
});
export type CouponsSchema = Input<typeof couponsSchema> & {
    createdAt?: Date;
    updatedAt?: Date;
};
