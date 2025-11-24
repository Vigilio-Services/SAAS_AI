import { SettingSchema } from "../schemas/setting.schema";

export const settingSeeder: Omit<SettingSchema, "id"> = {
    /* ===========================
     COLORES
  =========================== */
    bg_color: "#0B95BA",
    bg_color_paper: "#0B95BA",
    bg_color_responsive: "#f5f5f5",
    bg_color_secondary: "#f0f0f0",
    bg_color_header: "#1a1a1a",
    bg_color_aside: "#fafafa",
    text_color: "#333333",
    bg_color_button: "#ff6600",
    bg_color_background: "#ffffff",
    bg_color_page: "#ffffff",

    /* ===========================
     SETTINGS / CONFIGURACIÓN VISUAL
  =========================== */
    is_dark: false,
    type_border: "square",
    background_position: "center",
    background_type: "first",
    font_face: "Poppins",
    logo_width: 180,
    type_icons_bars: "light",
    hamburger: "bars",
    type_star: "star",
    position_header: true,
    border_title_type: "border",
    type_loader: "three",
    only_loader_home: true,
    type_card: "normal",
    type_product_buttons: "first",
    type_arrow: "second",
    products_limit: 12,
    products_limit_offer: 8,
    web_script: "",
    type_cart: "shopping-cart",
    header_type: "normal",

    /* ===========================
     MULTIMEDIA / IMÁGENES
  =========================== */
    background_auth: null, // o array de archivos válidos
    background_blogs: null, // o array de archivos válidos

    /* ===========================
     DISPONIBILIDADES (BOOLEANOS)
  =========================== */
    is_cover_image: true,
    is_logo_image: true,
    is_subcategory: false,
    is_block_aside: true,
    is_hidden_total_cart: false,
    is_hover_product: true,
    is_product_wallpaper: false,
    is_ecommerce: true,
    is_login: true,
    is_cuota: false,
    is_hidde_total_cart: false,

    /* ===========================
     SECCIONES Y MENÚS
  =========================== */
    shows: {
        map: true,
        about: true,
        cards: true,
        brands: true,
        android: false,
        offers_section: true,
        offers_user: false,
    },
    header_position: {
        logo: 1,
        navbar: 2,
        icons: 3,
    },

    /* ===========================
     MULTILENGUAJE
  =========================== */
    multi_lenguaje: {
        type: "normal",
        default: "es", // asumiendo que languagesUnion incluye "es"
        languages: ["es", "en"],
    },

    empresa_id: 1,
};
