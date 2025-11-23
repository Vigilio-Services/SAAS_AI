import {
    type Input,
    maxLength,
    minLength,
    number,
    object,
    string,
    toTrimmed,
} from "@vigilio/valibot";

export const featuresSchema = object({
    id: number(),
    value: string([toTrimmed(), minLength(1), maxLength(45)]),
    description: string([toTrimmed(), minLength(1), maxLength(45)]),
    option_id: number(),
});
export type FeaturesSchema = Input<typeof featuresSchema>;
