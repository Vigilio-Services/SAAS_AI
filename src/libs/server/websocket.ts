import type { ServerMiddleware } from "@vigilio/express-core";
import socket from "socket.io";
import Logger from "./logger";

export class GlobalMiddleware implements ServerMiddleware {
    public use(
        _io: socket.Server | socket.Namespace,
        _socket: socket.Socket,
        next: () => void
    ) {
        Logger.info(
            "********************conectado sockets correctamente***************"
        );
        next();
    }
}
