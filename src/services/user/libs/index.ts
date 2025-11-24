import type { DocumentCode, UserSchema } from "../schemas/user.schema";

export const estadoUser: [UserSchema["status"], string][] = [
    ["activo", "Activo"],
    ["desactivado", "Desactivado"],
    ["bloqueo-temporal", "Bloqueo Temporal"],
    ["bloqueo-definitivo", "Bloqueo Definitivo"],
];
export const classRole: Record<UserSchema["role"], string> = {
    administracion: " !border-black/80 border",
    worker: "!border-primary/80 border",
    user: "!border-green-600/80 border",
};
export const DOCUMENT_CODE: { key: DocumentCode; value: string }[] = [
    { key: "01", value: "DNI" },
    { key: "06", value: "RUC" },
];
export const USER_GENDER: { key: UserSchema["gender"]; value: string }[] = [
    {
        key: "masculino",
        value: "Masculino",
    },
    {
        key: "femenino",
        value: "Femenino",
    },
    {
        key: "otro",
        value: "Otro",
    },
];
