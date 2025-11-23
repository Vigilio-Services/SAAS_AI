import { IP_CEAR, type RequestVigilio } from "@config/server/const";
import enviroments from "@config/server/environments.config";
import type { UploadsEntities } from "@services/uploads/libs/server/uploads.libs";
import { UserSchema } from "@services/user/schemas/user.schema";
import { attachMiddleware } from "@vigilio/express-core";
import type { NextFunction, Request, Response } from "express";
import { jWTAuth } from "../middlewares/auth.middleware";

export function JWTAuth(roles: UserSchema["permisos"] = [], isApi = true) {
    return (
        target: unknown,
        propertyKey: string,
        _descriptor: PropertyDescriptor
    ) => {
        attachMiddleware(
            target,
            propertyKey,
            async (req: Request, res: Response, next: NextFunction) => {
                jWTAuth(roles, isApi)(req as RequestVigilio, res, next);
            }
        );
    };
}

export function JWTAuthUpload(exludeEntities: UploadsEntities[] = []) {
    return (
        target: unknown,
        propertyKey: string,
        _descriptor: PropertyDescriptor
    ) => {
        attachMiddleware(
            target,
            propertyKey,
            async (req: Request, res: Response, next: NextFunction) => {
                const entidad = req.params.entity;
                if (exludeEntities.includes(entidad as UploadsEntities)) {
                    return next();
                }
                jWTAuth([], true)(req as RequestVigilio, res, next);
            }
        );
    };
}
export function OnlyBussiness() {
    return (
        target: unknown,
        propertyKey: string,
        _descriptor: PropertyDescriptor
    ) => {
        attachMiddleware(
            target,
            propertyKey,
            async (req: Request, res: Response, next: NextFunction) => {
                const clientIp =
                    req.headers["x-forwarded-for"] || req.socket.remoteAddress;
                if (
                    !clientIp?.includes(IP_CEAR) &&
                    enviroments.NODE_ENV === "production"
                ) {
                    return res.status(401).json({
                        success: false,
                        message: "No esta permitido realizar esta acción",
                    });
                }
                next();
            }
        );
    };
}
