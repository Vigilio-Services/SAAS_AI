import { custom, object, string } from "@vigilio/valibot";
import {
    type UploadsEntities,
    type UploadsProperties,
    uploadsEntities,
    uploadsProperties,
} from "../libs/server/uploads.libs";

export const uploadsStorePipe = object({
    entity: string("Este campo es obligatorio", [
        custom((input) => uploadsEntities.includes(input as UploadsEntities)),
    ]),
    property: string("Este campo es obligatorio", [
        custom((input) =>
            uploadsProperties.includes(input as UploadsProperties)
        ),
    ]),
});

export const uploadsUpdatePipe = object({
    entity: string("Este campo es obligatorio", [
        custom((input) => uploadsEntities.includes(input as UploadsEntities)),
    ]),
    id: string("Este campo es obligatorio"),
    property: string("Este campo es obligatorio", [
        custom((input) =>
            uploadsProperties.includes(input as UploadsProperties)
        ),
    ]),
});
