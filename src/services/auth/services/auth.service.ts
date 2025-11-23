import { type RequestVigilio } from "@config/server/const";
import enviroments from "@config/server/environments.config";
import { sendEmail } from "@config/server/mail";
import { generarTokenJWT, verificarTokenJWT } from "@libs/server/helpers";
import { UserEntity } from "@services/user/entities/user.entity";
import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from "@vigilio/express-core";
import bcrypt from "bcryptjs";
import { MailOptions } from "nodemailer/lib/json-transport";
import type {
    AuthChangePasswordDto,
    AuthChangePasswordProfileDto,
    AuthForgotPasswordDto,
    AuthLoginDto,
    AuthProfileUpdateDto,
    UserAuth,
} from "../dtos/auth.dto";
import { ErrorLogService } from "./error_log.service";

@Injectable()
export class AuthService {
    constructor(
        // private readonly notificationService: NotificationService ,
        private readonly errorLogService: ErrorLogService // private readonly acccessLogService: AccessLogService
    ) {}

    async forgotPassword(req: RequestVigilio, body: AuthForgotPasswordDto) {
        const user = await UserEntity.findOne({
            where: { email: body.email },
            attributes: ["id", "email"],
            raw: true,
        });
        if (!user) {
            throw new BadRequestException(
                "No se encontró este correo en nuestro sistema"
            );
        }
        const token = generarTokenJWT<{ email: string; tipo: string }>(
            {
                email: user.email!,
                tipo: "recuperacion",
            },
            { expiresIn: "1h" }
        );

        const linkRecuperar = `${enviroments.VITE_URL}/auth/forgot-password?token=${token}`;

        await this.errorLogService.store(req, {
            type: "auth-forgot-password",
            username: user.email,
        });

        const mailOptions: MailOptions = {
            from: "administracion@cearlatinoamericano.pe",
            to: user.email!,
            subject: "Recuperación de Contraseña CEAR",
            html: /*html*/ `<div style="font-family: sans-serif;">
                <h2 style="font-size: 2rem; font-weight: bold;">RECUPERACIÓN DE CONTRASEÑA</h2>
                <p>Hola <b>${user.user_name}</b>, Para recuperar tu contraseña, <a href="${linkRecuperar}" style="color: #0b95ba; text-decoration: underline;">haz click aquí</a></p>
            </div>`,
        };
        if (enviroments.NODE_ENV === "production") {
            await sendEmail(mailOptions);
        }
        return {
            success: true,
            message:
                "Se envió correo de recuperación en tu buzon de Correo Electrónico",
        };
    }
    async changePassword(body: AuthChangePasswordDto) {
        if (body.password !== body.repeat_password) {
            throw new BadRequestException("Contraseña no similares");
        }
        const user = await UserEntity.findOne({
            where: { email: body.email },
            attributes: ["id", "password"],
        });
        if (!user) {
            throw new BadRequestException(
                "No se encontró este correo en nuestro sistema"
            );
        }
        user.password = bcrypt.hashSync(
            body.repeat_password,
            bcrypt.genSaltSync()
        );
        await user.save();
        return {
            success: true,
            message: "Se cambió la contraseña correctamente.",
        };
    }

    async changePasswordProfile(
        user: UserAuth,
        body: AuthChangePasswordProfileDto
    ) {
        const userPassword = await UserEntity.findOne({
            where: { id: user.id },
            attributes: ["password"],
            raw: true,
        });
        const verifyPassword = await bcrypt.compare(
            body.password!,
            userPassword?.password!
        );

        if (!verifyPassword) {
            throw new BadRequestException("Contraseña incorrecta", {
                body: "password",
            });
        }
        if (body.new_password !== body.repeat_new_password) {
            throw new BadRequestException("Contraseña no similares", {
                body: "repeat_new_password",
            });
        }
        const salt = await bcrypt.genSalt();
        const newPasword = await bcrypt.hash(body.repeat_new_password!, salt);
        await UserEntity.update(
            { password: newPasword },
            { where: { id: user.id } }
        );
        return {
            success: true,
            message: "Se cambió la contraseña correctamente.",
        };
    }

    async refreshToken(refresh_token: string) {
        const decoded = verificarTokenJWT(refresh_token) as {
            id: number;
        };
        if (!decoded) {
            throw new UnauthorizedException("No refresh token provided");
        }

        // Generate new access token
        const newAccessToken = generarTokenJWT(
            { id: decoded.id },
            { expiresIn: "24h" }
        );

        return {
            success: true,
            message: "Token actualizado correctamente",
            access_token: newAccessToken,
        };
    }

    async profileUpdate(user: UserAuth, body: AuthProfileUpdateDto) {
        await UserEntity.update(body, { where: { id: user.id } });
        return {
            success: true,
            message: "Se actualizó el perfil correctamente",
        };
    }

    async loginJWT(_: AuthLoginDto) {
        // const user = await User.findOne({
        //     where: { email: body.email },
        //     attributes: ["id", "password"],
        // });
    }
}
