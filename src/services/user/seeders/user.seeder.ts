import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";
import { UserSchema } from "../schemas/user.schema";

export function userSeeder(): Omit<UserSchema, "id">[] {
    return Array.from({ length: 100 }).map((_, i) => {
        const full_name = faker.person.fullName();
        return {
            code: `USER-00000${i + 1}`,
            user_name: `${full_name}-${i}`,
            full_name,
            father_lastname: faker.person.lastName(),
            mother_lastname: faker.person.lastName(),
            gender: "masculino",
            deleted_at: null,
            email:
                i === 0
                    ? "admin@cp.pe"
                    : i === 1
                    ? "estudiante@cp.pe"
                    : faker.internet.email(),
            enabled: faker.datatype.boolean(),
            password: bcrypt.hashSync("empresaPE123@", bcrypt.genSaltSync()),
            photo: [
                {
                    file: faker.image.avatar(),
                    name: full_name,
                    size: 100,
                },
                {
                    file: faker.image.avatar(),
                    name: full_name,
                    size: 500,
                },
            ],

            presentation: null,
            profesion: null,
            birthday: new Date(),
            role:
                i === 0
                    ? "administracion"
                    : i % 2 === 0
                    ? "user"
                    : i % 3 === 1
                    ? "worker"
                    : "administracion",
            permisos: [],
            user_id: null,
            address: faker.location.direction(),
            documento_code: "01",
            documento: `7060206${i + 1}`,
            city_id: 1,
            intentos_session: 1,
            intentos_session_date: null,
            status:
                i === 0
                    ? "activo"
                    : i === 1
                    ? "activo"
                    : faker.helpers.arrayElement<UserSchema["status"]>([
                          "activo",
                          "desactivado",
                          "bloqueo-definitivo",
                          "bloqueo-temporal",
                      ]),
            telefono: "938383883",
            subscription: null,
            wallpaper: null,
            ultima_conexion: null,
            enabled_email_offer: true,
            enabled_notifications_webpush: true,
            slug: `${full_name}-${i}`,
        };
    });
}
