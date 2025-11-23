// import { FileEntity } from "@/empresa/entitites/file.entity";
// import { FileSchemaToClient } from "@/empresa/schemas/file.schema";
// import { IconSchemaFromServer } from "@/empresa/schemas/icon.schema";
import { BASE_URL, RequestVigilio } from "@config/server/const";
import enviroments from "@config/server/environments.config";
import type { Response } from "express";

interface HeaderProps {
    title: string;
    description: string;
    keywords: string;
    req: RequestVigilio;
}
export function Header({ title, description, keywords, req }: HeaderProps) {
    // const logo = `${getFile("favicon", req.files)}`;
    const logo =
        "https://multimedia.infojobs.net/api/v1/tenants/c7e2b9c1-8480-43b0-ad9e-000c17aa2cbb/domains/718302b6-5343-43d3-a8a3-829dc3da0893/buckets/6f3ab1cc-5920-4f4e-b131-46a4587a0e1f/images/4d/4d9416dd-3ea9-4a06-a72c-e7156a3f3e73?jwt=eyJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MTc0MTY3MTAsInJxcyI6IkdFVFxcL3RlbmFudHMvYzdlMmI5YzEtODQ4MC00M2IwLWFkOWUtMDAwYzE3YWEyY2JiL2RvbWFpbnMvNzE4MzAyYjYtNTM0My00M2QzLWE4YTMtODI5ZGMzZGEwODkzL2J1Y2tldHMvNmYzYWIxY2MtNTkyMC00ZjRlLWIxMzEtNDZhNDU4N2EwZTFmL2ltYWdlcy80ZC80ZDk0MTZkZC0zZWE5LTRhMDYtYTcyYy1lNzE1NmEzZjNlNzMiLCJtZXRhZGF0YSI6eyJydWxlIjp7InZlcnNpb24iOiIyMDE2LTEwIiwiYWN0aW9ucyI6W119fX0.FLJLbtdCVxbxT0-ZkiVsMl5VSeviM53NbGlMgATalJ6guCIkvGDmDd6ToHjbV70VRJR0cjQKw8RcvTRUcFOotcv8k2GZAqeKbmpEEbX9x9P6ujU8RTji41LyT2aml60GfyIexSsvhNQIbwc2IHPkyu1zL4VkMcvGZt17Q6P1vh3xlOVIVEPK1ZH9r_8EIsHhDJEHSwZcVmWQlqJQCXfUoq68VPu9D_hjXiPpJhKxzYuTfCDuSQ9llyzZadTrOfyvnvUqyZqA7gfxtLtC1hUvEhwpwrqTEMugv8-Ua9AugHVL2xRnCD1Hlu98e-3X0TJk_TTXbkzrvUy1HCuDvZYWag&AccessKeyId=d724d9a53d95a810";

    const seo = {
        title,
        description,
        keywords,
    };

    return `
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${seo.title}</title>
        <meta name="description" content="${seo.description}">
        <meta name="keywords" content="${seo.keywords}">
        <meta itemprop="name" content="CEARLATINOAMERICANO">
        <meta itemprop="description" content="${seo.description}">
        <meta itemprop="image" content="${logo}">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:site" content="${BASE_URL()}">
        <meta name="twitter:title" content="${seo.title}">
        <meta name="twitter:description" content="${seo.description}">
        <meta name="twitter:creator" content="CEARLATINOAMERICANO">
        <meta name="twitter:image" content="${logo}">
        <meta property="og:title" content="${seo.title}">
        <meta property="og:type" content="website">
        <meta property="og:url" content="${logo}">
        <meta property="og:image" content="${logo}">
        <meta property="og:width" content="800">
        <meta property="og:height" content="800">
        <meta property="og:description" content="${seo.description}">
        <meta property="og:site_name" content="CEARLATINOAMERICANO">
        <meta name="fb:app_id" content="100064161184422">
        <link rel="apple-touch-icon" href="${logo}">
        <link rel="manifest" href="${enviroments.VITE_URL}/manifest.json">
        <link rel="icon" href="/images/settings/favicon.ico" type="image/x-icon">
        `;
}
export function tailwind(color_primary: string) {
    return `
     <!-- los primarios son --primary y --primary-foreground -->
        <!-- accent y accent-foreground -->
        <style type="text/css">
            @layer base {
            :root {
                /* Fondo y texto base */
                --background: #ffffff;
                --foreground: #111827;

                /* Tarjetas y superficies */
                --card: #ffffff;
                --card-foreground:#F7F8F9;

                /* Popovers / dropdowns */
                --popover: #ffffff;
                --popover-foreground: #111827;

                /* Primario (tu marca) */
                --primary: ${color_primary};
                --primary-foreground: #ffffff;

                /* Secundario / sidebar */
                --secondary: #f3f4f6;
                --secondary-foreground: #111827;

                /* Deshabilitado / muted */
                --muted: #f3f4f6;
                --muted-foreground: #6b7280;

                /* Acento (hover, selección) */
                --accent: #f3f4f6;
                --accent-foreground: #111827;

                /* Destructivo */
                --destructive: #ef4444;
                --destructive-foreground: #ffffff;

                /* Bordes */
                --border: #e5e7eb;
                --input: #e5e7eb;
                --ring: #111827;

                /* Esquinas */
                --radius: 0.5rem;
            }

            /* Modo oscuro */
            .dark {
                --background:#0A0A0A;          /* fondo página */
                --foreground: #fafafa;          /* texto principal */

                --card: #0A0A0A;                /* tarjetas */
                --card-foreground:#101010;

                --popover: #111111;
                --popover-foreground: #fafafa;

                --primary: ${color_primary};    /* tu marca */
                --primary-foreground: #ffffff;

                --secondary: #161616;           /* sidebar / hover */
                --secondary-foreground: #fafafa;

                --muted: #161616;
                --muted-foreground: #888888;    /* text-muted */

                --accent: #161616;
                --accent-foreground: #fafafa;

                --destructive: #e5484d;         /* rojo Vercel */
                --destructive-foreground: #fafafa;

                --border: #333333;              /* bordes */
                --input: #333333;
                --ring: #fafafa;                /* focus-ring */
                }
                @font-face {
                    font-family: "Font-Light";
                    src: url("/settings/fonts/geist/Geist-Light.ttf") format("truetype");
                    font-display: swap;
                }

                @font-face {
                    font-family: "Font-Medium";
                    src: url("/settings/fonts/geist/Geist-Medium.ttf") format("truetype");
                    font-display: swap;
                }

                @font-face {
                    font-family: "Font-SemiBold";
                    src: url("/settings/fonts/geist/Geist-SemiBold.ttf") format("truetype");
                    font-display: swap;
                }
                @font-face {
                    font-family: "Font-Bold";
                    src: url("/settings/fonts/geist/Geist-Bold.ttf") format("truetype");
                    font-display: swap;
                }
                @font-face {
                    font-family: "Font-ExtraBold";
                    src: url("/settings/fonts/geist/Geist-ExtraBold.ttf") format("truetype");
                    font-display: swap;
                }
        </style>
    `;
}
export function styleEditorPreview() {
    return `
    <style>
    .mce-content-body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif;width:100%;}.mce-content-body p{display:block!important;margin:1em 0!important;text-align:justify;}.mce-content-body h2{display:block!important;font-size:1.5em!important;margin:0.43em 0!important;font-weight:bold!important;text-align:justify;}.mce-content-body h3{display:block!important;font-size:1.17em!important;margin:0.43em 0!important;font-weight:bold!important;text-align:justify;}.mce-content-body h4{display:block!important;font-size:1em!important;margin:0.43em 0!important;font-weight:bold!important;text-align:justify;}.mce-content-body h5{display:block!important;font-size:0.83em!important;margin:0.43em 0!important;font-weight:bold!important;text-align:justify;}.mce-content-body h6{display:block!important;font-size:0.67em!important;margin:0.43em 0!important;font-weight:bold!important;text-align:justify;}.mce-content-body ul{display:block!important;list-style-type:disc!important;margin:1em 0!important;padding-left:40px!important;}.mce-content-body ol{display:block!important;list-style-type:decimal!important;margin:1em 0!important;padding-left:40px!important;}.mce-content-body li{display:list-item!important;}.mce-content-body a{color:(internal value)!important;text-decoration:underline!important;cursor:pointer!important;text-align:justify;}.mce-content-body strong{font-weight:bold!important;}.mce-content-body em{font-style:italic!important;}.mce-content-body u{text-decoration:underline!important;}.mce-content-body s{text-decoration:line-through!important;}.mce-content-body small{font-size:smaller!important;}.mce-content-body blockquote{display:block!important;margin:1em 40px!important;}.mce-content-body pre{display:block!important;font-family:monospace!important;white-space:pre!important;margin:1em 0!important;}.mce-content-body span{display:inline!important;text-align:justify;}.mce-content-body br{display:inline!important;}.mce-content-body table{display:table!important;border-spacing:2px!important;}.mce-content-body tr{display:table-row!important;}.mce-content-body td{display:table-cell!important;padding:1px!important;}.mce-content-body th{display:table-cell!important;font-weight:bold!important;padding:1px!important;}.mce-content-body img{display:inline-block!important;}.mce-content-body hr{display:block!important;margin:0.5em auto!important;border-style:inset!important;border-width:1px!important;}.mce-content-body table{border-collapse:collapse;}.mce-content-body table:not([cellpadding]) th,.mce-content-body table:not([cellpadding]) td{padding:0.4rem;}.mce-content-body table[border]:not([border="0"]):not([style*="border-width"]) th,.mce-content-body table[border]:not([border="0"]):not([style*="border-width"]) td{border-width:1px;}.mce-content-body table[border]:not([border="0"]):not([style*="border-style"]) th,.mce-content-body table[border]:not([border="0"]):not([style*="border-style"]) td{border-style:solid;}.mce-content-body table[border]:not([border="0"]):not([style*="border-color"]) th,.mce-content-body table[border]:not([border="0"]):not([style*="border-color"]) td{border-color:#ccc;}.mce-content-body figure{display:table;margin:1rem auto;}.mce-content-body figure figcaption{color:#999;display:block;margin-top:0.25rem;}.mce-content-body hr{border-color:#ccc;border-style:solid;border-width:1px 0 0 0;}.mce-content-body code{background-color:#e8e8e8;border-radius:3px;padding:0.1rem 0.2rem;}.mce-content-body:not([dir=rtl]) blockquote{border-left:2px solid #ccc;margin-left:1.5rem;padding-left:1rem;}.mce-content-body[dir=rtl] blockquote{border-right:2px solid #ccc;margin-right:1.5rem;padding-right:1rem;}
    </style>
    `;
}
export function escapeQuotes(str: string): string {
    return str.replace(/"/g, '\\"');
}

/**
 *  html json strifidy
 */
export function escapeForHtmlAttribute(json: string) {
    return json
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

/**
 *  parser props
 */
export function propsToString(props: Record<string, unknown>): string {
    return Object.entries(props)
        .map(([key, value]) => {
            if (typeof value === "string") {
                return `${key}="${escapeQuotes(value)}"`; // ecape
            }
            return `:${key}="${escapeForHtmlAttribute(JSON.stringify(value))}"`;
        })
        .join(" ");
}

export function render(props: {
    lang?: string;
    head?: {
        title: string;
        description?: string;
        keywords?: string;
    };
    scripts?: string[];
    css?: string[];
    props?: Record<string, unknown>;
}) {
    return async (req: RequestVigilio, res: Response) => {
        function formatPath(routePath: string) {
            let formatted = routePath.startsWith("/")
                ? routePath.slice(1)
                : routePath;

            formatted = !Number.isNaN(Number(formatted[0]))
                ? `page-${formatted.replace("*", "")}`
                : formatted.startsWith(":")
                ? `page-${formatted.slice(1).replace("*", "")}`
                : formatted.replace("*", "");

            if (formatted === "") return "index";
            const segments = formatted.split("/");
            const processedSegments = segments.map((segment) => {
                if (segment.startsWith(":")) {
                    return `[${segment.slice(1)}]`;
                }
                return segment;
            });
            formatted = processedSegments.join("-");
            if (!formatted.endsWith("]")) {
                formatted += "-index";
            }
            return formatted;
        }
        let pathJs = formatPath(req.route.path.toLowerCase());
        // let files: FileSchemaToClient[] | null = cacheGetJson("files");

        // if (!files) {
        //     files = await FileEntity.findAll({
        //         raw: true,
        //         attributes: ["id", "name", "file"],
        //     });
        //     cache.set("files", JSON.stringify(files), cacheTimes.days30);
        // }

        pathJs = pathJs === "admin*-index" ? "app-index" : pathJs;
        pathJs = pathJs === "admin*-index" ? "app-index" : pathJs;

        // const icons = cacheGetJson<IconSchemaFromServer[]>("icons");
        // BEST PERFORMANCE, GET THIS IN ALL PAGES
        const result = {
            empresa: req.empresa,
        };
        props.props = {
            ...(props.props || {}),
            ...result,
        };
        // (req as RequestVigilio).files = result.files;

        let header = {
            title: "Centro de Arbitraje e Investigaciones Jurídicas. Especialistas en arbitraje con contrataciones públicas, arbitrajes de emergencias y Junta de Resolución de disputas.",
            description: "",
            keywords:
                "arbitraje, arbitraje en contrataciones públicas, arbitraje con el estado, arbitraje de emergencia, normativa contratación pública Perú, disputas contractuales, resolución de controversias, junta de resolución de disputas, dispute boards",
        };
        if (props.head) {
            header = { ...header, ...props.head };
        }

        // pathJs = `pages-${pathJs}`;
        return res.send(`
            <!DOCTYPE html>
            <html lang="${props.lang || "es"}">
                        <head>
                            ${
                                Header({
                                    ...header,
                                    req,
                                }) || ""
                            }
                            ${tailwind(req.empresa.setting.bg_color)}
                            ${styleEditorPreview()}
                            ${res.locals.vite}
                            ${props.scripts?.join("\n") || ""}
                            ${props.css?.join("\n") || ""}
                        </head>
                        <body class="bg-linear-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-[#0A0A0A] dark:via-[#111111] dark:to-[#0A0A0A] text-foreground">
                            <${pathJs}></${pathJs}>
                           <script>window.props = ${JSON.stringify(
                               props.props || {}
                           )}; </script>
                        </body>
                    </html>`);
    };
}
