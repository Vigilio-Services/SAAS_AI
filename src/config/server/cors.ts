import { EmpresaEntity } from "@services/empresa/entitites/empresa.entity";
import { EmpresaHostEntity } from "@services/empresa/entitites/empresa_host.entity";
import { EmpresaSchema } from "@services/empresa/schemas/empresa.schema";
import { EmpresaHostSchema } from "@services/empresa/schemas/empresa_host.schema";
import cache from "@vigilio/express-core/cache";
import cors from "cors";
import { Op } from "sequelize";
import enviroments from "./environments.config";

export const corsOptions: cors.CorsOptions = {
    origin: async (origin, callback) => {
        let hosts: string[] | null = JSON.parse(cache?.get("HOSTS") || "null");
        if (!hosts) {
            const empresas = await EmpresaEntity.unscoped().findAll({
                include: [
                    {
                        model: EmpresaHostEntity,
                        //   dominio.com
                        where: {
                            host: {
                                [Op.ne]: null,
                            },
                        },
                        required: true,
                        attributes: [
                            "host",
                        ] satisfies (keyof EmpresaHostSchema)[],
                    },
                ],
                attributes: ["id", "slug"] satisfies (keyof EmpresaSchema)[],
            });
            hosts = empresas
                .filter((emp) => emp.host.host)
                .map((emp) => `https://www.${emp.host.host}`);
            cache.set("HOSTS", JSON.stringify(hosts));
        }

        // Aquí puedes agregar lógica para permitir subdominios, y añadimos a la lista blanca los hosts
        const allowedOrigins = [
            "https://*.vigilio-services.com",
            `http://*.localhost:${enviroments.PORT}`,
            "https://vigilioservices2.loca.lt",
            "http://localhost:3000", //!
            enviroments.VITE_URL,
            // `https://${enviroments.CLIENT.toLowerCase()}.vigilio-services.com`,
            ...hosts,
        ];
        // Agrega los dominios y subdominios permitidos
        if (
            !origin ||
            allowedOrigins.some((allowedOrigin) =>
                new RegExp(allowedOrigin.replace(/\*/g, ".*")).test(origin)
            )
        ) {
            callback(null, true); // Permitir origen
        } else {
            callback(new Error("Not allowed by CORS")); // No permitir origen
        }
    },
    credentials: true,
};
