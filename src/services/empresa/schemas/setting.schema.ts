import { COLOR_REGEX } from "@libs/index";
import { filesSchema } from "@services/uploads/schemas/uploads.schema";
import {
    array,
    boolean,
    Input,
    literal,
    maxLength,
    maxValue,
    minValue,
    nullable,
    number,
    object,
    regex,
    string,
    toTrimmed,
    union,
} from "@vigilio/valibot";

export const languagesUnion = union([
    literal("es"),
    literal("en"),
    literal("zh-CN"),
    literal("pt"),
    literal("it"),
    literal("tr"),
    literal("fr"),
    literal("zh-TW"),
    literal("ru"),
    literal("ar"),
    literal("sv"),
    literal("bg"),
    literal("xh"),
    literal("fy"),
    literal("sd"),
    literal("sn"),
    literal("gd"),
    literal("sm"),
    literal("ps"),
    literal("lb"),
    literal("ky"),
    literal("vi"),
    literal("az"),
    literal("sk"),
    literal("fa"),
    literal("mn"),
    literal("pl"),
    literal("ja"),
    literal("ro"),
    literal("ko"),
    literal("ka"),
    literal("cs"),
    literal("la"),
    literal("af"),
    literal("sq"),
    literal("tl"),
    literal("sr"),
    literal("id"),
    literal("hi"),
    literal("nl"),
]);
export type LanguagesUnion = Input<typeof languagesUnion>;

export const settingSchema = object({
    id: number(),

    // ===========================
    // COLORES
    // ===========================
    bg_color: string([
        regex(COLOR_REGEX, "Color incorrecto"),
        maxLength(30),
        toTrimmed(),
    ]),
    bg_color_paper: string([
        regex(COLOR_REGEX, "Color incorrecto"),
        maxLength(30),
        toTrimmed(),
    ]),
    bg_color_responsive: string([
        regex(COLOR_REGEX, "Color incorrecto"),
        maxLength(30),
        toTrimmed(),
    ]),
    bg_color_secondary: string([
        regex(COLOR_REGEX, "Color incorrecto"),
        maxLength(30),
        toTrimmed(),
    ]),
    bg_color_header: string([
        regex(COLOR_REGEX, "Color incorrecto"),
        maxLength(30),
        toTrimmed(),
    ]),
    bg_color_aside: string([
        regex(COLOR_REGEX, "Color incorrecto"),
        maxLength(30),
        toTrimmed(),
    ]),
    text_color: string([
        regex(COLOR_REGEX, "Color incorrecto"),
        maxLength(30),
        toTrimmed(),
    ]),
    bg_color_button: string([
        regex(COLOR_REGEX, "Color incorrecto"),
        maxLength(30),
        toTrimmed(),
    ]),
    bg_color_background: string([
        regex(COLOR_REGEX, "Color incorrecto"),
        maxLength(30),
        toTrimmed(),
    ]),
    bg_color_page: string([
        regex(COLOR_REGEX, "Color incorrecto"),
        maxLength(30),
        toTrimmed(),
    ]),

    // ===========================
    // SETTINGS / CONFIGURACIÓN VISUAL
    // ===========================
    is_dark: boolean(),
    type_border: union(
        [literal("circle"), literal("square")],
        "Border no válido"
    ),
    background_position: union(
        [literal("center"), literal("start"), literal("end")],
        "position no válido"
    ),
    background_type: union(
        [literal("first"), literal("second")],
        "Tipo de Background no válido"
    ),
    font_face: union(
        [
            literal("Barlow"),
            literal("Exo"),
            literal("Poppins"),
            literal("Roboto"),
            literal("GeistMono"),
            literal("Lato"),
        ],
        "fuente no válido"
    ),
    logo_width: number(),
    type_icons_bars: union(
        [literal("normal"), literal("light")],
        "Tipo de icono no válido"
    ),
    hamburger: union(
        [
            literal("pizza-slice"),
            literal("soup"),
            literal("car"),
            literal("utensils-alt"),
            literal("gamepad-alt"),
            literal("hamburger"),
            literal("bars"),
        ],
        "Tipo de icono no válido"
    ),
    type_star: union([literal("heart"), literal("star")]),
    type_cart: union(
        [
            literal("shopping-cart"),
            literal("shopping-bag"),
            literal("shopping-basket"),
        ],
        "Tipo de carrito no válido"
    ),
    header_type: union(
        [
            literal("normal"),
            literal("search"),
            literal("search2"),
            literal("transparent"),
        ],
        "Tipo de header no válido"
    ),
    position_header: boolean(),
    border_title_type: union(
        [
            literal("normal"),
            literal("circle"),
            literal("border"),
            literal("null"),
        ],
        "Border title type no válido"
    ),
    type_loader: union(
        [
            literal("one"),
            literal("two"),
            literal("three"),
            literal("four"),
            literal("null"),
        ],
        "Tipo de loader no válido"
    ),
    only_loader_home: boolean(),
    type_card: union(
        [literal("normal"), literal("eccomerce")],
        "Tipo de carta no válido"
    ),
    type_product_buttons: union(
        [literal("first"), literal("second")],
        "Tipo de carta no válido"
    ),
    type_arrow: union(
        [literal("first"), literal("second"), literal("third")],
        "Tipo de flecha no válido"
    ),
    products_limit: number([minValue(1), maxValue(30)]),
    products_limit_offer: number([minValue(1), maxValue(30)]),
    web_script: string([toTrimmed()]),

    // ===========================
    // MULTIMEDIA / IMÁGENES
    // ===========================

    background_auth: nullable(array(filesSchema([100, 1800]))),
    background_blogs: nullable(array(filesSchema([100, 1600]))),
    // ===========================
    // DISPONIBILIDADES (BOOLEANOS)
    // ===========================
    is_cover_image: boolean(),
    is_logo_image: boolean(),
    is_subcategory: boolean(),
    is_block_aside: boolean(),
    is_hidden_total_cart: boolean(),
    is_hover_product: boolean(),
    is_product_wallpaper: boolean(),
    is_ecommerce: boolean(),
    is_login: boolean(),
    is_cuota: boolean(),
    is_hidde_total_cart: boolean(),

    // ===========================
    // SECCIONES Y MENÚS
    // ===========================
    shows: object({
        map: boolean(),
        about: boolean(),
        cards: boolean(),
        brands: boolean(),
        android: boolean(),
        offers_section: boolean(),
        offers_user: boolean(),
    }),
    header_position: object({
        logo: number(),
        navbar: number(),
        icons: number(),
    }),

    // ===========================
    // MULTILENGUAJE
    // ===========================
    is_language_active: boolean(),
    multi_lenguaje: nullable(
        object({
            type: union([
                literal("globe"),
                literal("normal"),
                literal("emergente"),
            ]),
            default: languagesUnion,
            languages: array(languagesUnion),
        })
    ),

    empresa_id: number("Este campo es obligatorio."),
});
export type SettingSchema = Input<typeof settingSchema>;
