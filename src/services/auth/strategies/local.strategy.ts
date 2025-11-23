import { academicNumero, RequestVigilio } from "@config/server/const";
import { UserEntity } from "@services/user/entities/user.entity";
import { UserSchema } from "@services/user/schemas/user.schema";
import bcrypt from "bcryptjs";
import { Strategy as LocalStrategy } from "passport-local";
import { UserAuth } from "../dtos/auth.dto";
import { errorLogStore } from "../libs/server";

export function localStrategy() {
    return new LocalStrategy(
        { usernameField: "email", passReqToCallback: true },
        async (req, email, password, done) => {
            const user = await UserEntity.unscoped().findOne({
                where: {
                    email,
                },
                attributes: [
                    "id",
                    "user_name",
                    "full_name",
                    "father_lastname",
                    "mother_lastname",
                    "photo",
                    "role",
                    "email",
                    "intentos_session",
                    "password",
                    "intentos_session_date",
                    "status",
                ] satisfies (keyof UserSchema)[],
                raw: true,
            });

            if (!user) {
                await errorLogStore(req as RequestVigilio, {
                    type: "auth-email",
                    username: email,
                });
                return done(null, false, {
                    message: "Correo Electrónico ó contranseña incorrecta.",
                });
            }
            //
            if (user.status === "bloqueo-definitivo") {
                return done(null, false, {
                    message: `La cuenta de ${user.user_name} ha sido bloqueada por muchos intentos fallidos. Comunicarte  al CEAR Académico: ${academicNumero}.`,
                });
            }
            if (
                user.intentos_session_date &&
                user.intentos_session_date?.getTime() > Date.now()
            ) {
                return done(null, false, {
                    message:
                        "Acceso temporalmente bloqueado. Por favor, intente nuevamente en unos minutos.",
                });
            }

            if (!user.password) {
                await errorLogStore(req as RequestVigilio, {
                    type: "auth-password",
                    username: email,
                });
                return done(null, false, {
                    message:
                        "Este user no tiene contraseña, comunicarse con personal para generar uno.",
                });
            }
            const verifyPassword = bcrypt.compareSync(password, user.password);

            if (!verifyPassword) {
                const SUM_INTENTOS: number = user.intentos_session + 1;
                const MIN5: number = 300000;

                const date5min: Date = new Date(Date.now() + MIN5);
                // 6 INTENTOS SE BLOQUE PERMANENTE DEFINITIVO
                const status: UserAuth["status"] =
                    SUM_INTENTOS > 5 ? "bloqueo-definitivo" : user.status;

                if (status === "bloqueo-definitivo") {
                    const academicosUsers = await UserEntity.findAll({
                        where: {
                            role: ["academico", "super-admin"],
                        },
                        attributes: ["id"],
                        raw: true,
                    });
                    // await notificationStore(null, {
                    //     message: `${
                    //         user.role === "estudiante"
                    //             ? "Estudiante"
                    //             : "Usuario"
                    //     } bloqueado por muchos intentos: ${user.user_name}`,
                    //     type: "login_fail",
                    //     url: `/interno/usuarios/${user.code}`,
                    //     title: `Usuario bloqueado por muchos intentos: ${user.user_name}`,
                    //     users: academicosUsers.map((academico) => academico.id),
                    // });
                }
                await UserEntity.update(
                    {
                        intentos_session: SUM_INTENTOS,
                        intentos_session_date:
                            SUM_INTENTOS === 3 ? date5min : null,
                        status,
                    },
                    { where: { id: user.id } }
                );
                await errorLogStore(req as RequestVigilio, {
                    type: "auth-password",
                    username: email,
                });

                return done(null, false, {
                    message:
                        SUM_INTENTOS > 5
                            ? "Cuenta bloqueado definitivamente, Comunicarte con CEAR LATINOAMERICANO"
                            : "Correo Electrónico ó contranseña incorrecta.",
                });
            }
            const { password: p, ...rest } = user; //quitar contraseña
            // await accessLogStore(req as RequestVigilio, user.id);
            // regresar al intento session a 0
            if (user.intentos_session || user.intentos_session_date) {
                await UserEntity.update(
                    {
                        intentos_session: 0,
                        intentos_session_date: null,
                    },
                    { where: { id: user.id } }
                );
            }

            return done(null, rest);
        }
    );
}
