import path from "node:path";
import { UserAuth } from "@services/auth/dtos/auth.dto";
import type { EmpresaSchemaFromServer } from "@services/empresa/schemas/empresa.schema";
import { FileSchemaFromServer } from "@services/empresa/schemas/file.schema";
import { Request } from "express";
import enviroments from "./environments.config";

export const dirMode = path.resolve(__dirname, "..", "..", "..");

export const BASE_URL = () => enviroments.VITE_URL;

export const IP_CEAR = "170.0.234.103";
export const academicNumero = "986605219";
export const academicEmail = "area-academico@cearlatinoamericano.edu.pe";
// Esto soluciona un bug que tiene sequelize-typescript
export type V<T> = ReturnType<() => T>;

// req global mas atributos
export interface RequestVigilio extends Request {
    user: UserAuth;
    empresa: EmpresaSchemaFromServer;
    files: FileSchemaFromServer[];
}
