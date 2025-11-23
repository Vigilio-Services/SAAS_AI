const am8 = "08:00";
const pm8 = "22:00";
export const empresaSeeder = {
    name_empresa: "CEAR",
    dial_code: "51" as const,
    model_groq_ai: "open_ai" as const,
    timezone: "America/Lima",
    emails: ["yonatanvigiliolavado09@gmail.com"],
    enabled: {
        enabled_address: true,
        enabled_animation: true,
        enabled_booster: true,
        enabled_bot: true,
        enabled_bot_web: true,
        enabled_comentario_id: true,
        enabled_email_message: true,
        enabled_map_marker: true,
        enabled_sound: true,
        is_open: true,
    },
    is_production: false,
    is_template: false,
    lang: "es" as const,
    max_users: 100,
    rastreo: {
        facebook_pixel: {
            enabled: true,
            value: null,
        },
        google_manager: {
            enabled: true,
            value: null,
        },
        tiktok_pixel: {
            enabled: true,
            value: null,
        },
        linkedin_tag: {
            enabled: true,
            value: null,
        },
    },
    red: {
        facebook: {
            enabled: true,
            value: "https://www.facebook.com",
        },
        instagram: {
            enabled: true,
            value: "https://www.instagram.com",
        },
        linkedin: {
            enabled: true,
            value: "https://www.linkedin.com",
        },
        tiktok: {
            enabled: true,
            value: "https://www.tiktok.com",
        },
        x: {
            enabled: true,
            value: "https://www.x.com/",
        },
        youtube: {
            enabled: true,
            value: "https://www.youtube.com/",
        },
    },
    schedule: [
        {
            id: 1,
            day: "Lunes",
            openTime: am8,
            closeTime: pm8,
            enabled: true,
        },
        {
            id: 2,
            day: "Martes",
            openTime: am8,
            closeTime: pm8,
            enabled: true,
        },
        {
            id: 3,
            day: "Miercoles",
            openTime: am8,
            closeTime: pm8,
            enabled: true,
        },
        {
            id: 4,
            day: "Jueves",
            openTime: am8,
            closeTime: pm8,
            enabled: true,
        },
        {
            id: 5,
            day: "Viernes",
            openTime: am8,
            closeTime: pm8,
            enabled: true,
        },
        {
            id: 6,
            day: "Sabado",
            openTime: am8,
            closeTime: pm8,
            enabled: true,
        },
        {
            id: 0,
            day: "Domingo",
            openTime: am8,
            closeTime: pm8,
            enabled: true,
        },
    ],
    slug: "vigilio-services",
    telephones: [
        { isReclamos: false, type: "cellphone" as const, value: "99999999" },
    ],
    token: "sdsdsdsds",
    bancos: ["bcp", "interbank", "bbva"],
    type_empresa_id: 1,
    year_founded: new Date(),
    icon: null,
    logo: null,
    logo_pwa: null,
    type_empresa_other: "",
};
