import {
    type Input,
    maxLength,
    minLength,
    number,
    object,
    string,
    toTrimmed,
} from "@vigilio/valibot";

export const inteligenciaArtificialQuestionSchema = object({
    id: number(),
    question: string([minLength(3), maxLength(300), toTrimmed()]),
    answer: string([minLength(3), maxLength(300), toTrimmed()]),
    user_id: number(),
    empresa_id: number(),
});
export type InteligenciaArtificialQuestionSchema = Input<
    typeof inteligenciaArtificialQuestionSchema
>;
