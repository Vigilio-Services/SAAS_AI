interface Enviroments {
    VITE_EMPRESA: string;
    VITE_NAME_APP: string;
    VITE_ENV: "production" | "development";
    VITE_URL: string;
    VITE_PORT: number;
    // notificaciones push
    VITE_PLUBIC_VAPID_KEY: string;
    VITE_PRIVATE_VAPID_KEY: string;
    VITE_CAPTCHA_KEY: string;
    VITE_IGV: number;
    VITE_DIASFACTURASBOLETA: number;
}
// @ts-ignore
const env = import.meta.env;
const enviroments: Enviroments = {
    VITE_EMPRESA: env.VITE_EMPRESA!,
    VITE_NAME_APP: env.VITE_NAME_APP!,
    VITE_ENV: env.VITE_ENV! as "development" | "production",
    VITE_URL: `${env.VITE_ENV === "production" ? "https://" : "http://"}${
        env.VITE_URL
    }`,
    VITE_PORT: Number(env.VITE_PORT)!,
    VITE_PLUBIC_VAPID_KEY: env.VITE_PLUBIC_VAPID_KEY!,
    VITE_PRIVATE_VAPID_KEY: env.VITE_PRIVATE_VAPID_KEY!,
    VITE_CAPTCHA_KEY: env.VITE_CAPTCHA_KEY!,
    VITE_IGV: Number(env.VITE_IGV),
    VITE_DIASFACTURASBOLETA: Number(env.VITE_DIASFACTURASBOLETA),
};

export default enviroments;
