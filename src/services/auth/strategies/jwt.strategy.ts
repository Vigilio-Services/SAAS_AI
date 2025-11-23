import { academicNumero, RequestVigilio } from "@config/server/const";
import enviroments from "@config/server/environments.config";
import { UserEntity } from "@services/user/entities/user.entity";
import { UserSchema } from "@services/user/schemas/user.schema";
import bcrypt from "bcryptjs";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { AuthLoginDto, UserAuth } from "../dtos/auth.dto";
import { accessLogStore, errorLogStore } from "../libs/server";

export function jwtStrategy() {
    return new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: enviroments.JWT_KEY,
            passReqToCallback: true,
        },
        async (req: RequestVigilio, body: AuthLoginDto, done) => {
            const user = await UserEntity.findOne({
                where: {
                    email: body.email,
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
                    username: body.email,
                });
                return done(null, false, {
                    message: "Correo Electrónico ó contranseña incorrecta.",
                });
            }
            //
            if (user.status === "bloqueo-temporal") {
                return done(null, false, {
                    message: `La cuenta de ${user.user_name} ha sido bloqueada por intentos fallidos. Contacte al CEAR Académico: ${academicNumero}.`,
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
                    username: body.email,
                });
                return done(null, false, {
                    message:
                        "Este user no tiene contraseña, comunicarse con personal para generar uno.",
                });
            }
            const verifyPassword = bcrypt.compareSync(
                body.password!,
                user.password
            );

            if (!verifyPassword) {
                const SUM_INTENTOS: number = user.intentos_session + 1;
                const MIN5: number = 300000;

                const date5min: Date = new Date(Date.now() + MIN5);
                const status: UserAuth["status"] =
                    SUM_INTENTOS === 9 ? "bloqueo-definitivo" : user.status;

                if (status === "bloqueo-definitivo") {
                    // await notificationStore(null, {
                    //     message: `User Bloqueado por muchos intentos: ${user.user_name}`,
                    //     type: "login_fail",
                    //     url: "https://",
                    //     title: `User bloqueado por muchos intentos: ${user.user_name}`,
                    //     users: [user.id],
                    // });
                }
                await UserEntity.update(
                    {
                        intentos_session: SUM_INTENTOS,
                        intentos_session_date:
                            SUM_INTENTOS === 3 || SUM_INTENTOS === 6
                                ? date5min
                                : null,
                        status,
                    },
                    { where: { id: user.id } }
                );
                await errorLogStore(req as RequestVigilio, {
                    type: "auth-password",
                    username: body.email,
                });
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

                return done(null, false, {
                    message: "Correo Electrónico ó contranseña incorrecta.",
                });
            }

            await accessLogStore(req as RequestVigilio, user.id);
            return done(null, user);
        }
    );
}
