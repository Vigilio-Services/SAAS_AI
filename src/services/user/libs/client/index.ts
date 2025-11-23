import {
    ChalkboardUserIconSolid,
    PersonChalkboardIconSolid,
    PersonDressIconSolid,
    PersonHalfDressIconSolid,
    PersonIconSolid,
    UserIconSolid,
    UsersIconSolid,
    UserTieIconSolid,
} from "@vigilio/react-icons/fontawesome";
import type { SVGProps } from "preact/compat";
import type { JSX } from "react";
import type { UserSchema } from "../../schemas/user.schema";

export interface UserTypeConfig {
    id: UserSchema["role"];
    label: string;
    Icon: (props: SVGProps<SVGSVGElement> & { title?: string }) => JSX.Element;
    className: string;
}

export interface StatusConfig {
    id: UserSchema["status"];
    label: string;
    className: string;
}

// Usar Record para mapear tipos
export const userTypes: Record<UserSchema["role"], UserTypeConfig> = {
    "super-admin": {
        id: "super-admin",
        label: "Super Admin",
        Icon: UserIconSolid,
        className: "bg-black/80 text-white",
    },
    academico: {
        id: "academico",
        label: "Académico",
        Icon: ChalkboardUserIconSolid,
        className: "bg-primary/80 text-white",
    },
    administracion: {
        id: "administracion",
        label: "Administración",
        Icon: UserTieIconSolid,
        className: "bg-purple-600/80 text-white",
    },
    docente: {
        id: "docente",
        label: "Docente",
        Icon: PersonChalkboardIconSolid,
        className: "bg-green-600/80 text-white",
    },
    estudiante: {
        id: "estudiante",
        label: "Estudiante",
        Icon: UsersIconSolid,
        className: "bg-primary/80 text-white",
    },
};

export const userStatus: Record<UserSchema["status"], StatusConfig> = {
    activo: {
        id: "activo",
        label: "Activo",
        className: "!bg-green-100 text-green-800",
    },
    desactivado: {
        id: "desactivado",
        label: "Desactivado",
        className: "!bg-red-100 text-red-800",
    },
    "bloqueo-temporal": {
        id: "bloqueo-temporal",
        label: "Bloqueo Temporal",
        className: "!bg-yellow-100 text-yellow-800",
    },
    "bloqueo-definitivo": {
        id: "bloqueo-definitivo",
        label: "Bloqueo Definitivo",
        className: "!bg-red-100 text-red-800",
    },
};

export interface GenderConfig {
    id: UserSchema["gender"];
    label: string;
    Icon: (props: SVGProps<SVGSVGElement> & { title?: string }) => JSX.Element;
    className: string;
}
export const userGender: Record<UserSchema["gender"], GenderConfig> = {
    masculino: {
        id: "masculino",
        label: "Masculino",
        className: "!bg-blue-100 text-blue-800",
        Icon: PersonIconSolid,
    },
    femenino: {
        id: "femenino",
        label: "Femenino",
        className: "!bg-pink-100 text-pink-800",
        Icon: PersonDressIconSolid,
    },
    otro: {
        id: "otro",
        label: "Otro",
        className: "!bg-gray-100 text-gray-800",
        Icon: PersonHalfDressIconSolid,
    },
};
