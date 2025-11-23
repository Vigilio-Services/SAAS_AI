import http from "node:http";
import enviroments from "@config/server/environments.config";
// import { jwtStrategy } from "@/auth/strategies/jwt.strategy";
import { cacheTimes } from "@libs/server/helpers";
import Logger from "@libs/server/logger";
import {
    errorHandlerMiddleware,
    middlewareInitialCache,
    middlewareRoute,
} from "@libs/server/middleware-route";
import { GlobalMiddleware } from "@libs/server/websocket";
import { UserAuth } from "@services/auth/dtos/auth.dto";
import { jwtStrategy } from "@services/auth/strategies/jwt.strategy";
import { localStrategy } from "@services/auth/strategies/local.strategy";
import { userShow } from "@services/user/libs/server";
import {
    attachControllers,
    attachSocketControllers,
    Container,
    ERROR_MIDDLEWARE,
    IO_MIDDLEWARE,
} from "@vigilio/express-core";
import { simpleCache } from "@vigilio/express-core/cache";
import { client } from "@vigilio/express-core/client";
import { ServerErrorMiddleware } from "@vigilio/express-core/handler";
import { logger } from "@vigilio/express-core/helpers";
import compression from "compression";
import SessionSequelize from "connect-session-sequelize";
import cors from "cors";
import express from "express";
import session from "express-session";
import morgan from "morgan";
import passport from "passport";
import * as socket from "socket.io";
import { apiRouters } from "src/routers/api.router";
import { socketsRouters } from "src/routers/socket.router";
import { webRouters } from "src/routers/web.router";
import { dirMode } from "./const";
import { corsOptions } from "./cors";
import { connectDB, sequelize } from "./db.config";

// biome-ignore lint/suspicious/noConsole: <explanation>
console.time("ts-watch");
export class Server {
    public readonly app: express.Application = express();

    constructor() {
        this.middlewares();
        // Llama a la función para inicializar las instancias
    }
    async middlewares() {
        // comprimir paginas webs para mejor rendimiento - NO TOCAR si no es necesario
        this.app.use(
            compression({
                threshold: 10000,
                filter: (req, res) => {
                    if (req.headers["x-no-compression"]) {
                        return false;
                    }
                    return compression.filter(req, res);
                },
            })
        );
        this.app.use(cors(corsOptions));
        // helmet seguridad csp
        // this.app.use(
        //     helmet({
        //         contentSecurityPolicy: {
        //             // Configura aunque sea una política básica
        //             directives: {
        //                 defaultSrc: ["'self'"],
        //                 scriptSrc: [
        //                     "'self'",
        //                     `http://localhost:${enviroments.VITE_PORT}`, // Permite scripts desde Vite (dev)
        //                     "'unsafe-inline'", // Necesario para Vite en desarrollo
        //                     "'unsafe-eval'", // Necesario para HMR (Hot Module Replacement)
        //                     "https://www.google.com", // Allow Google domains
        //                     "https://www.gstatic.com",
        //                     "https://cearlatinoamericano.pe", // Permitir TinyMCE
        //                     "https://064b67e3357a.ngrok-free.app",
        //                     "wss://empresa.cearlatinoamericano.pe",
        //                     "ws://empresa.cearlatinoamericano.pe",
        //                     enviroments.VITE_URL,
        //                     `ws://${enviroments.VITE_URL}`,
        //                 ],
        //                 connectSrc: [
        //                     "'self'",
        //                     `http://localhost:${enviroments.VITE_PORT}`, // Permite conexiones a Vite (websockets)
        //                     `ws://localhost:${enviroments.VITE_PORT}`, // WebSockets para HMR
        //                     `ws://${enviroments.VITE_URL}`, // WebSockets para HMR
        //                     "https://cearlatinoamericano.pe",
        //                     "wss://cearlatinoamericano.pe",
        //                     "ws://empresa.cearlatinoamericano.pe",
        //                     "wss://empresa.cearlatinoamericano.pe",
        //                     "https://064b67e3357a.ngrok-free.app",
        //                     enviroments.VITE_URL,
        //                 ],
        //                 frameSrc: [
        //                     "'self'",
        //                     "https://www.google.com", // Required for reCAPTCHA
        //                     "https://www.recaptcha.net", // Alternative domain
        //                     "https://www.youtube.com",
        //                 ],
        //                 imgSrc: [
        //                     "'self'",
        //                     "data:",
        //                     "blob:",
        //                     "https://akamai.sscdn.co",
        //                     "https://picsum.photos",
        //                     "https://cdn.jsdelivr.net",
        //                     "https://avatars.githubusercontent.com",
        //                     "https://cearlatinoamericano.edu.pe",
        //                     "https://cearlatinoamericano.pe",
        //                 ],
        //                 mediaSrc: ["'self'", "data:", "blob:"],

        //                 // Añade más según necesites
        //             },
        //         },
        //         dnsPrefetchControl: true,
        //         frameguard: { action: "deny" },
        //         hidePoweredBy: true,
        //         hsts: { maxAge: 31536000, includeSubDomains: true }, // Solo si usas HTTPS
        //         ieNoOpen: true,
        //         noSniff: true,
        //         xssFilter: false, // Opcional: Mejor depender de CSP
        //         // Considera añadir:
        //         referrerPolicy: { policy: "strict-origin-when-cross-origin" },
        //     })
        // );
        // habilitar para consumir json
        this.app.use(express.json({ limit: "1000mb" }));
        // this.app.use(express.urlencoded({ limit: "1000mb", extended: true }));
        this.app.use(simpleCache({ autoCleanTime: cacheTimes.hour }));

        // habilitar carpeta public
        this.app.use(express.static(`${dirMode}/public`));

        this.app.use(
            "/tinymce",
            express.static(`${dirMode}/node_modules/@vigilio/tinymce`)
        );
        // vite js configuración
        this.app.use(client({ file: "pages/main.tsx" }));
        await connectDB();

        // caching variable, mejor rendimiento
        this.app.use(middlewareInitialCache);
        await this.auth();
        this.routes();
    }

    async auth() {
        if (enviroments.NODE_ENV === "production") {
            this.app.set("trust proxy", 1);
        }

        // https://www.passportjs.org/concepts/authentication/sessions/
        const SequelizeStore = SessionSequelize(session.Store);
        // session
        const store = new SequelizeStore({
            db: sequelize,
            tableName: "sessions", // Opcional: nombre personalizado para la tabla
            checkExpirationInterval: cacheTimes.hour * 1000, // Limpiar sesiones expiradas cada 15 min
            expiration: cacheTimes.days3 * 1000, // Tiempo de expiración coherente con cookie
        });
        await store.sync();
        this.app.use(
            session({
                secret: enviroments.JWT_KEY,
                resave: false,
                saveUninitialized: false,
                rolling: true,
                proxy: enviroments.NODE_ENV === "production", // NODE_ENV === 'production'
                cookie: {
                    secure: enviroments.NODE_ENV === "production", //true in production
                    httpOnly: enviroments.NODE_ENV === "production",
                    maxAge: cacheTimes.days3 * 1000, // 3 dias
                },
                store,
            })
        );
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        // strategies
        passport.use(localStrategy());
        passport.use(jwtStrategy());

        passport.serializeUser((user, done) => {
            return done(null, user);
        });
        passport.deserializeUser(async (user: UserAuth, done) => {
            const usuario = await userShow(String(user.id));
            if (!usuario) {
                return done(null, null);
            }
            return done(null, usuario.user);
        });
    }

    routes() {
        this.app.use(
            morgan(
                enviroments.NODE_ENV === "development" ? "dev" : "combined",
                {
                    stream: {
                        write: (message) => {
                            Logger.http(message.trim());
                        },
                    },
                }
            )
        );
        const apiRouter = express.Router();
        const webRouter = express.Router();
        attachControllers(apiRouter, apiRouters);
        attachControllers(webRouter, webRouters);
        Container.provide([
            { provide: ERROR_MIDDLEWARE, useClass: ServerErrorMiddleware },
        ]);
        this.app.use("/", webRouter);
        this.app.use("/api", apiRouter);
        this.app.use(middlewareRoute);
        this.app.use(errorHandlerMiddleware);
    }
    sockets() {
        // socket io
        const server = new http.Server(this.app);
        server.setTimeout(1800000); // 30 minutos
        const io = new socket.Server(server);
        Container.provide([
            { provide: IO_MIDDLEWARE, useClass: GlobalMiddleware },
        ]);
        attachSocketControllers(io, socketsRouters);
        return server;
    }
    listen() {
        const server = this.sockets().listen(enviroments.PORT, () => {
            // biome-ignore lint/suspicious/noConsole: <explanation>
            console.timeEnd("ts-watch");
            logger.primary(`Run server in port ${enviroments.PORT}`);
        });
        return server;
    }
}
