import type { RequestVigilio } from "@config/server/const";
import { Injectable } from "@vigilio/express-core";
import { accessLogStore } from "../libs/server";

@Injectable()
export class AccessLogService {
    async store(req: RequestVigilio, user_id: number) {
        const result = await accessLogStore(req, user_id);
        return result;
    }
}
