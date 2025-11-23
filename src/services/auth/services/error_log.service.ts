import type { RequestVigilio } from "@config/server/const";
import { Injectable } from "@vigilio/express-core";
import { errorLogStore } from "../libs/server";
import { ErrorLogSchema } from "../schemas/error_log.schema";

@Injectable()
export class ErrorLogService {
    async store(
        req: RequestVigilio,
        body: Pick<ErrorLogSchema, "type" | "username">
    ) {
        const result = await errorLogStore(req, body);
        return result;
    }
}
