import * as crypto from "node:crypto";
import { RequestVigilio } from "@config/server/const";
import enviroments from "@config/server/environments.config";
import { UserSchema } from "@services/user/schemas/user.schema";
import {
    attachMiddleware,
    InternalServerErrorException,
} from "@vigilio/express-core";
import type { NextFunction, Request, Response } from "express";
import passport from "passport";
import type { UserAuth } from "../dtos/auth.dto";

export function jWTAuth(permisos: UserSchema["permisos"], isApi: boolean) {
    return async (req: RequestVigilio, res: Response, next: NextFunction) => {
        // Si ya está autenticado, verificar roles directamente
        if (req.isAuthenticated() && req.user) {
            return checkRoles();
        }

        // Si no está autenticado, usar passport.authenticate
        passport.authenticate(
            "jwt",
            { session: false },
            (err: Error, user: UserAuth, info: { message?: string } = {}) => {
                if (err || !user) {
                    return isApi
                        ? res.status(401).json({
                              success: false,
                              message: info?.message || "Unauthorized",
                          })
                        : res.redirect("/auth/login");
                }

                req.user = user;
                checkRoles();
            }
        )(req, res, next);
        async function checkRoles()      {
            const user = req.user as UserAuth;
            if (
                !user ||
                user.status !== "activo" ||
                (permisos.length > 0 &&
                    !permisos.some((permiso) =>
                        user.permisos.includes(permiso)
                    ))
            ) {
                return isApi
                    ? res.status(403).json({
                          success: false,
                          message: "Authorization denied",
                      })
                    : res.redirect("/auth/login");
            }

            return next();
        }
    };
}
export function hmacAuthMiddleware(req: Request, res: Response) {
    const receivedSignature = req.headers["x-signature"];
    const timestamp = req.headers["x-timestamp"];
    if (!receivedSignature || !timestamp) {
        return res
            .status(403)
            .json({ success: false, message: "Unauthorized" });
    }
    if (
        Math.abs(Date.now() - Number.parseInt(timestamp as string, 10)) > 300000
    ) {
        return res
            .status(403)
            .json({ success: false, message: "Firma y timestamp requeridos" });
    }
    const secretKey = enviroments.VITE_HMAC_KEY;

    if (!secretKey) {
        throw new InternalServerErrorException(
            "Error de configuración del servidor"
        );
    }

    const dataToSign = `${timestamp}:${req.method}:${req.originalUrl}`;

    const expectedSignature = crypto
        .createHmac("sha256", secretKey)
        .update(dataToSign)
        .digest("hex");

    if (receivedSignature !== expectedSignature) {
        return res
            .status(403)
            .json({ success: false, message: "Firma y timestamp requeridos" });
    }
    return true;
}

export function HmacAuth() {
    return (
        target: unknown,
        propertyKey: string,
        _descriptor: PropertyDescriptor
    ) => {
        attachMiddleware(
            target,
            propertyKey,
            async (req: Request, res: Response, next: NextFunction) => {
                const isAccepted = hmacAuthMiddleware(req, res);
                if (isAccepted) {
                    return next();
                }
                return res.status(500).json({
                    success: false,
                    message: "Error de configuración del servidor",
                });
            }
        );
    };
}
