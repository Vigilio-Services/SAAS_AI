import {
    type Input,
    maxLength,
    minLength,
    number,
    object,
    string,
    toTrimmed,
} from "@vigilio/valibot";

export const optionsSchema = object({
    id: number(),
    name: string([toTrimmed(), minLength(1), maxLength(45)]),
    type: number(),
});
export type OptionsSchema = Input<typeof optionsSchema>;
