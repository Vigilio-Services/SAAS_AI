import { RequestVigilio } from "@config/server/const";
import enviroments from "@config/server/environments.config";
import {
    generateCodeEntity,
    getInformationWithIP,
    getOS,
} from "@libs/server/helpers";
import { AccessLog } from "@services/auth/entities/access_log.entity";
import { ErrorLog } from "@services/auth/entities/error_log.entity";
import { AccessLogSchema } from "@services/auth/schemas/access_log.schema";
import { ErrorLogSchema } from "@services/auth/schemas/error_log.schema";

export async function errorLogStore(
    req: RequestVigilio,
    body: Pick<ErrorLogSchema, "type" | "username">
) {
    const clientIp = req.ip;
    const forwardedIp = req.headers["x-forwarded-for"];
    const realIp = (
        forwardedIp ? (forwardedIp as string).split(",")[0].trim() : clientIp
    ) as string;
    const browser = req.headers["user-agent"] as string;
    const os = getOS(browser);
    let address = "CEAR LATINOAMERICANO - OFICINAS";
    if (enviroments.NODE_ENV === "production") {
        address = await getInformationWithIP(realIp);
    }
    const code = await generateCodeEntity(ErrorLog, "code", "ELOG-");
    const errorlogStore: Omit<ErrorLogSchema, "id"> = {
        ip: realIp,
        code,
        address,
        fecha_hora: new Date(),
        browser,
        os,
        username: body.username,
        type: body.type,
    };
    const error_log = await ErrorLog.create(errorlogStore);
    return {
        success: true,
        error_log,
    };
}

export async function accessLogStore(req: RequestVigilio, user_id: number) {
    const clientIp = req.ip;
    const forwardedIp = req.headers["x-forwarded-for"];
    const realIp = (
        forwardedIp ? (forwardedIp as string).split(",")[0].trim() : clientIp
    ) as string;
    const browser = req.headers["user-agent"] as string;
    const os = getOS(browser);
    let address = "CEAR LATINOAMERICANO - OFICINAS";
    if (enviroments.NODE_ENV === "production") {
        address = await getInformationWithIP(realIp);
    }
    const code = await generateCodeEntity(AccessLog, "code", "ALOG-");
    const accesslogStore: Omit<AccessLogSchema, "id"> = {
        code,
        ip: realIp,
        address,
        fecha_hora: new Date(),
        browser,
        os,
        user_id,
    };
    const access_log = await AccessLog.create(accesslogStore);
    return {
        success: true,
        access_log,
    };
}
