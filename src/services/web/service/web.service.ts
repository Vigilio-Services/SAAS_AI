import { Injectable } from "@vigilio/express-core";

@Injectable()
export class WebService {
    async home() {
        return {
            hello: "world",
        };
    }
}
