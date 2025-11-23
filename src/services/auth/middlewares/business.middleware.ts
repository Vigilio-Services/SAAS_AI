import { IP_CEAR } from "@config/server/const";
import enviroments from "@config/server/environments.config";
import { Redirect } from "@vigilio/express-core";
import type { NextFunction, Request, Response } from "express";

export async function onlyBussinessMiddleware(
    req: Request,
    _: Response,
    next: NextFunction
) {
    const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    if (!clientIp?.includes(IP_CEAR) && enviroments.NODE_ENV === "production") {
        throw new Redirect("/");
    }
    next();
}
