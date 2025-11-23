import dotenv from "dotenv";

dotenv.config({ path: ".env" });

interface Enviroments {
    NODE_ENV: "production" | "development";
    VITE_ENV: "production" | "development";
    PORT: number;
    DB_HOST: string;
    DB_PORT: number;
    DB_NAME: string;
    DB_USER: string;
    DB_PASS: string;
    JWT_KEY: string;
    VITE_HMAC_KEY: string;
    MAIL_HOST: string;
    MAIL_PORT: string;
    VITE_URL: string;
    BASE_URL_FACTURACION: string;
    VITE_PORT: string;
    VITE_PLUBIC_VAPID_EMAIL: string;
    VITE_PLUBIC_VAPID_KEY: string;
    VITE_PRIVATE_VAPID_KEY: string;
    // niubiz
    NIUBIZ_URL_API: string;
    NIUBIZ_URL_JS: string;
    NIUBIS_USER: string;
    NIUBIS_PASSWORD: string;
    NIUBIS_MERCHANT_ID: string;
    NIUBIS_CURRENCY: string;
    // IGV
    VITE_IGV: number;
    VITE_DIASFACTURASBOLETA: number;
}
const enviroments: Enviroments = {
    NODE_ENV: process.env.NODE_ENV! as "development" | "production",
    VITE_ENV: process.env.VITE_ENV! as "development" | "production",
    PORT: Number(process.env.PORT!),
    // db
    DB_HOST: process.env.DB_HOST!,
    DB_PORT: Number(process.env.DB_PORT)!,
    DB_NAME: process.env.DB_NAME!,
    DB_USER: process.env.DB_USER!,
    DB_PASS: process.env.DB_PASS!,

    // jwt
    JWT_KEY: process.env.JWT_KEY!,
    VITE_HMAC_KEY: process.env.VITE_HMAC_KEY!,

    // mail
    MAIL_HOST: process.env.MAIL_HOST!,
    MAIL_PORT: process.env.MAIL_PORT!,

    VITE_URL: `${
        process.env.VITE_ENV === "production" ? "https://" : "http://"
    }${process.env.VITE_URL}`,
    BASE_URL_FACTURACION: process.env.BASE_URL_FACTURACION!,
    VITE_PORT: process.env.VITE_PORT!,
    // webpush
    VITE_PLUBIC_VAPID_EMAIL: process.env.VITE_PLUBIC_VAPID_EMAIL!,
    VITE_PLUBIC_VAPID_KEY: process.env.VITE_PLUBIC_VAPID_KEY!,
    VITE_PRIVATE_VAPID_KEY: process.env.VITE_PRIVATE_VAPID_KEY!,
    // niubis
    NIUBIS_MERCHANT_ID: process.env.NIUBIS_MERCHANT_ID!,
    NIUBIZ_URL_API: process.env.NIUBIZ_URL_API!,
    NIUBIZ_URL_JS: process.env.NIUBIZ_URL_JS!,
    NIUBIS_USER: process.env.NIUBIS_USER!,
    NIUBIS_PASSWORD: process.env.NIUBIS_PASSWORD!,
    NIUBIS_CURRENCY: process.env.NIUBIS_CURRENCY!,
    //
    VITE_IGV: Number(process.env.VITE_IGV),
    VITE_DIASFACTURASBOLETA: Number(process.env.VITE_DIASFACTURASBOLETA),
};

export default enviroments;
