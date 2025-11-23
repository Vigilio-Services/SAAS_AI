import Form from "@components/form";
import { useEmpresaContext } from "@contexts/empresa.context";
import { useThemeContext } from "@contexts/theme.context";
import { cn, isColorLight } from "@libs/client/helpers";
import { printFileWithDimension } from "@libs/index";
import { UseFormReturn } from "react-hook-form";
import type { ConfiguracionPerzonalizacionTab } from "src/pages/dashboard/configuracion/personalizacion";
import { Link } from "wouter-preact";
import { SettingUpdateDto } from "../dtos/setting.dto";
import {
    HAMBURGUERS,
    LANGUAGES_SELECT,
    LANGUAGES_SELECT_TYPE,
} from "../libs/setting.lib";
import { SettingSchema } from "../schemas/setting.schema";

interface SettingConfiguracionUpdateProps {
    configuracion_tab: ConfiguracionPerzonalizacionTab;
    form: UseFormReturn<SettingUpdateDto>;
}
function SettingConfiguracionUpdate({
    configuracion_tab,
    form,
}: SettingConfiguracionUpdateProps) {
    const empresaContext = useEmpresaContext();
    const themeContext = useThemeContext();
    const bg_color_paper = form.watch("bg_color_paper");
    const bg_color_background = form.watch("bg_color_background");
    const position_header = form.watch("position_header");
    const header_position = form.watch("header_position");
    const isDark = form.watch("is_dark");
    const bg_color = form.watch("bg_color");
    const type_border = form.watch("type_border");
    const isCoverImage = form.watch("is_cover_image");
    const isLogoImage = form.watch("is_logo_image");
    const type_card = form.watch("type_card");
    const type_product_buttons = form.watch("type_product_buttons");
    const type_loader = form.watch("type_loader");
    const type_star = form.watch("type_star");
    const type_icons_bars = form.watch("type_icons_bars");
    const font_face = form.watch("font_face");
    const type_animation = form.watch("type_animation");
    const hamburger = form.watch("hamburger");
    const background_type = form.watch("background_type");
    const background_position = form.watch("background_position");
    const border_title_type = form.watch("border_title_type");
    const bg_color_footer = form.watch("bg_color_footer");
    const type_cart = form.watch("type_cart");
    const header_type = form.watch("header_type");
    const type_arrow = form.watch("type_arrow");
    const multi_lenguaje = form.watch("multi_lenguaje");
    return (
        <div className={cn(configuracion_tab !== "settings" && "hidden")}>
            <div class="grid grid-cols-2 lg:grid-cols-4">
                <div class="w-[120px]">
                    <Form.control<SettingUpdateDto>
                        name="logo_width"
                        type="number"
                        title="Tamaño de logo"
                        placeholder={"80"}
                        question="Tamaño de tu logo en pixeles"
                        options={{ setValueAs: Number }}
                    />
                </div>
                <div>
                    <label
                        htmlFor=""
                        class="text-xs font-semibold  dark:text-white"
                    >
                        Posición del header [1, 2, 3]
                    </label>
                    <div class="grid grid-cols-3">
                        <div class="w-[60px]">
                            <Form.control<SettingUpdateDto>
                                title="logo"
                                name={"header_position.logo"}
                                type="number"
                                min={1}
                                max={3}
                                options={{ setValueAs: Number }}
                            />
                        </div>
                        <div class="w-[60px]">
                            <Form.control<SettingUpdateDto>
                                title="Navbar"
                                name={"header_position.navbar"}
                                type="number"
                                min={1}
                                max={3}
                                options={{ setValueAs: Number }}
                            />
                        </div>
                        <div class="w-[60px]">
                            <Form.control<SettingUpdateDto>
                                title="Iconoes"
                                name={"header_position.icons"}
                                type="number"
                                min={1}
                                max={3}
                                options={{ setValueAs: Number }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex gap-2 items-center w-full">
                <div class="w-full">
                    <div
                        style={{
                            backgroundColor: bg_color_paper,
                        }}
                    >
                        <div class="flex gap-2 flex-wrap w-full">
                            <header
                                class={
                                    " w-full px-4    py-4 shadow    delay-custom-1 "
                                }
                                style={{
                                    background: bg_color_background,
                                    color: isColorLight(bg_color_background)
                                        ? "#000000"
                                        : "#FFFFFF",
                                }}
                            >
                                <div class=" max-w-6xl mx-auto">
                                    <div class="flex justify-between gap-2 items-center">
                                        {!position_header ? (
                                            <div
                                                class="flex items-center gap-2"
                                                style={{
                                                    order:
                                                        header_position?.logo ??
                                                        1,
                                                }}
                                            >
                                                <button
                                                    type="button"
                                                    aria-label="open aside"
                                                    // onClick={
                                                    //     // headerDropdown.onOpen
                                                    // }
                                                >
                                                    {/* <Hamburguer
                                                                    isOpen={
                                                                        headerDropdown.dropdownOpen
                                                                    }
                                                                /> */}
                                                </button>
                                                <a
                                                    href={"/"}
                                                    class="flex  items-center "
                                                >
                                                    {empresaContext.empresa!
                                                        .logo ? (
                                                        <img
                                                            width={100}
                                                            height={100}
                                                            src={
                                                                printFileWithDimension(
                                                                    empresaContext.empresa!
                                                                        .logo!,
                                                                    100
                                                                )[0]
                                                            }
                                                            class="w-[50px] h-[50px] object-contain"
                                                            alt={
                                                                empresaContext.empresa!
                                                                    .name_empresa
                                                            }
                                                        />
                                                    ) : (
                                                        <h2 class="text-2xl font-bold  uppercase">
                                                            {
                                                                empresaContext.empresa!
                                                                    .name_empresa[0]
                                                            }
                                                        </h2>
                                                    )}
                                                </a>
                                            </div>
                                        ) : (
                                            <>
                                                {/* <button
                                                                type="button"
                                                                aria-label="open aside"
                                                                onClick={
                                                                    headerDropdown.onOpen
                                                                }
                                                                style={{
                                                                    order:
                                                                        header_position?.logo ??
                                                                        1,
                                                                }}
                                                            >
                                                                <div
                                                                    class={
                                                                        "hamburger hamburger--collapse"
                                                                    }
                                                                >
                                                                    <i
                                                                        class={`${hamburger} ${
                                                                            hamburger ===
                                                                            "fas pizza-slice"
                                                                                ? "rotate-[250deg]"
                                                                                : ""
                                                                        } text-3xl `}
                                                                    />
                                                                </div>
                                                            </button> */}

                                                <a
                                                    href={"/"}
                                                    class="flex  items-center ml-12"
                                                    style={{
                                                        order:
                                                            header_position?.logo ??
                                                            1,
                                                    }}
                                                >
                                                    {empresaContext.empresa!
                                                        .logo ? (
                                                        <img
                                                            width={100}
                                                            height={100}
                                                            src={
                                                                printFileWithDimension(
                                                                    empresaContext.empresa!
                                                                        .logo!,
                                                                    100
                                                                )[0]
                                                            }
                                                            class="w-[60px] h-[60px] object-contain"
                                                            alt={
                                                                empresaContext.empresa!
                                                                    .name_empresa
                                                            }
                                                        />
                                                    ) : (
                                                        <h2 class="text-2xl font-bold  uppercase">
                                                            {
                                                                empresaContext.empresa!
                                                                    .name_empresa[0]
                                                            }
                                                        </h2>
                                                    )}
                                                </a>
                                            </>
                                        )}
                                        {/* cartaside */}
                                        {/* <div
                                                        class={`fixed inset-0 bg-opacity-70 bg-black z-[999] flex justify-end h-full ${
                                                            cartStore.dropdown
                                                                .value
                                                                ? "visible"
                                                                : "invisible"
                                                        } delay-custom-1`}
                                                        onClick={
                                                            cartStore.dropdown
                                                                .onClose
                                                        }
                                                        style={{
                                                            order:
                                                                header_position?.navbar ??
                                                                2,
                                                        }}
                                                    >
                                                        <div
                                                            class={`w-full delay-custom-1 md:w-[350px] bg-white dark:bg-paper-dark relative p-2 ${
                                                                cartStore
                                                                    .dropdown
                                                                    .value
                                                                    ? "translate-x-0"
                                                                    : "translate-x-full"
                                                            }`}
                                                            onClick={(e) =>
                                                                e.stopPropagation()
                                                            }
                                                        >
                                                            <button
                                                                class="text-end block  text-primary absolute top-0 right-0 m-2"
                                                                type="button"
                                                                aria-label="close cart"
                                                                onClick={
                                                                    cartStore
                                                                        .dropdown
                                                                        .onClose
                                                                }
                                                            >
                                                                <i class="fa-solid fa-x" />
                                                            </button>
                                                            <CartAside />
                                                        </div>
                                                    </div> */}

                                        {/* endcartaside */}
                                        <div
                                            class="flex gap-3 items-center   text-xl "
                                            style={{
                                                order:
                                                    header_position?.icons ?? 3,
                                            }}
                                        >
                                            {/* <SearchProducts /> */}
                                            <button
                                                type="button"
                                                aria-label="btn"
                                                class="text-white px-4 py-2 rounded-md text-xs font-semibold"
                                                style={{
                                                    backgroundColor: bg_color,
                                                }}
                                            >
                                                Sign In
                                            </button>
                                            {isDark ? (
                                                <button
                                                    type="button"
                                                    aria-label="change theme"
                                                    onClick={() => {
                                                        themeContext.methods.changeThemeMode(
                                                            themeContext.state ===
                                                                "dark"
                                                                ? "light"
                                                                : "dark"
                                                        );
                                                    }}
                                                >
                                                    {themeContext.state ===
                                                    "dark" ? (
                                                        <i class="fas fa-moon" />
                                                    ) : (
                                                        <i class="far fa-sun" />
                                                    )}
                                                </button>
                                            ) : null}

                                            {/* <button
                                                            type="button"
                                                            class=" text-xl   relative"
                                                            onClick={
                                                                cartStore
                                                                    .dropdown
                                                                    .onOpen
                                                            }
                                                        >
                                                            <i
                                                                class={
                                                                    type_cart
                                                                }
                                                            />
                                                            <span class="absolute -top-1 -right-2 bg-primary text-xs font-bold flex justify-center items-center text-white w-[20px] h-[20px] rounded-full">
                                                                {
                                                                    cartStore
                                                                        .computed
                                                                        .showCartLength
                                                                }
                                                            </span>
                                                        </button> */}
                                        </div>
                                    </div>
                                </div>
                            </header>
                        </div>
                        <br />{" "}
                        {/* <TitleSection
                                        titleExample={border_title_type}
                                    >
                                        Esto es un titulo
                                    </TitleSection>{" "} */}
                        <div
                            class="flex flex-col gap-2 self-start p-2 md:w-[500px] rounded-md shadow-md mx-2"
                            style={{
                                color: isColorLight(bg_color_background)
                                    ? "#000000 !important"
                                    : "#FFFFFF !important",
                                backgroundColor: bg_color_background,
                            }}
                        >
                            <div class="flex flex-col md:flex-row gap-4 items-center">
                                <div
                                    class={`w-[200px]  shadow bg-paper-light dark:bg-admin-terciary overflow-hidden ${
                                        type_border === "circle"
                                            ? "rounded-md"
                                            : ""
                                    }`}
                                >
                                    <div class="relative">
                                        <img
                                            class={`mx-auto w-[300px] h-[200px] ${
                                                isCoverImage
                                                    ? "object-cover"
                                                    : "object-contain"
                                            }`}
                                            width={200}
                                            height={150}
                                            src="https://http2.mlstatic.com/D_NQ_NP_993674-MLA31895860508_082019-O.webp"
                                            alt=""
                                        />
                                        {isLogoImage ? (
                                            <div class="absolute right-0 bottom-1 z-[9]">
                                                {/* <LogoImage
                                                                width="40"
                                                                height="40"
                                                            /> */}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                                <div
                                    class={`${
                                        isColorLight(bg_color_background)
                                            ? "parent_form"
                                            : ""
                                    }`}
                                >
                                    <style jsx>{`
                                        .parent_form label {
                                            ${isColorLight(bg_color_background)
                                                ? "color: #000000 !important"
                                                : "color: #FFFFFF !important"};
                                        }
                                    `}</style>
                                    <Form.control.select<SettingUpdateDto>
                                        name={"type_border"}
                                        title="Borde"
                                        array={[
                                            {
                                                key: "circle",
                                                value: "Redondo",
                                            },
                                            {
                                                key: "square",
                                                value: "Rectangular",
                                            },
                                        ]}
                                        placeholder="Escoger tipo de border"
                                    />
                                    <div class="grid gap-2 grid-cols-2">
                                        <Form.control.toggle<SettingUpdateDto>
                                            name={"is_cover_image"}
                                            title="¿Cover Imagen?"
                                        />
                                        <Form.control.toggle<SettingUpdateDto>
                                            name={"is_hover_product"}
                                            title="Hover Imagen?"
                                        />
                                        <Form.control
                                            type="number"
                                            name={"products_limit"}
                                            title="Limite de Productos"
                                            options={{
                                                setValueAs: Number,
                                            }}
                                            question="Limite de Productos por categoria en Home Product Category Seccion"
                                        />
                                        <Form.control<SettingUpdateDto>
                                            type="number"
                                            name={"products_limit_offer"}
                                            title="Limite de Productos Oferta"
                                            options={{
                                                setValueAs: Number,
                                            }}
                                            question="Limite de Productos de ofertas en Home Product Category Seccion"
                                        />
                                    </div>

                                    <div>
                                        <span class="text-xs dark:text-white font-semibold">
                                            Tipo de Card
                                        </span>
                                        <div class="flex gap-2 flex-wrap">
                                            <div class="flex flex-col gap-1">
                                                <div class="flex gap-1">
                                                    <button
                                                        class={`min-w-[60px] h-[60px] rounded-md hover:bg-paper-light hover:dark:bg-admin-terciary border border-gray-300 ${
                                                            type_card ===
                                                            "normal"
                                                                ? "bg-paper-light dark:bg-admin-terciary"
                                                                : ""
                                                        } font-semibold text-xs dark:text-white`}
                                                        type="button"
                                                        onClick={() => {
                                                            form.setValue(
                                                                "type_card",
                                                                "normal"
                                                            );
                                                        }}
                                                    >
                                                        Normal
                                                    </button>
                                                    <button
                                                        class={`min-w-[60px] h-[60px] rounded-md hover:bg-paper-light hover:dark:bg-admin-terciary border border-gray-300 ${
                                                            type_card ===
                                                            "eccomerce"
                                                                ? "bg-paper-light dark:bg-admin-terciary"
                                                                : ""
                                                        } font-semibold text-xs dark:text-white`}
                                                        type="button"
                                                        onClick={() => {
                                                            form.setValue(
                                                                "type_card",
                                                                "eccomerce"
                                                            );
                                                        }}
                                                    >
                                                        Eccomerce
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <span class="text-xs dark:text-white font-semibold">
                                            Tipo de Boton Product
                                        </span>
                                        <div class="flex gap-2 flex-wrap">
                                            <div class="flex flex-col gap-1">
                                                <div class="flex gap-1">
                                                    <button
                                                        class={`min-w-[60px] h-[60px] rounded-md hover:bg-paper-light hover:dark:bg-admin-terciary border border-gray-300 ${
                                                            type_product_buttons ===
                                                            "first"
                                                                ? "bg-paper-light dark:bg-admin-terciary"
                                                                : ""
                                                        } font-semibold text-xs dark:text-white`}
                                                        type="button"
                                                        onClick={() => {
                                                            form.setValue(
                                                                "type_product_buttons",
                                                                "first"
                                                            );
                                                        }}
                                                    >
                                                        Primer
                                                    </button>
                                                    <button
                                                        class={`min-w-[60px] h-[60px] rounded-md hover:bg-paper-light hover:dark:bg-admin-terciary border border-gray-300 ${
                                                            type_product_buttons ===
                                                            "second"
                                                                ? "bg-paper-light dark:bg-admin-terciary"
                                                                : ""
                                                        } font-semibold text-xs dark:text-white`}
                                                        type="button"
                                                        onClick={() => {
                                                            form.setValue(
                                                                "type_product_buttons",
                                                                "second"
                                                            );
                                                        }}
                                                    >
                                                        Segundo
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="grid grid-cols-2 gap-2">
                                        <Form.control.toggle<SettingUpdateDto>
                                            name={"is_logo_image"}
                                            title="¿Ingresar logo?"
                                            question={
                                                <div class="w-[150px]">
                                                    {!empresaContext.empresa
                                                        .logo ? (
                                                        <>
                                                            <Link
                                                                href="/empresa"
                                                                class="text-primary underline font-semibold text-xs"
                                                            >
                                                                No ingresaste
                                                                logo a tu
                                                                empresa
                                                            </Link>
                                                            <br />
                                                        </>
                                                    ) : null}
                                                    Cuando subes las imagenes a
                                                    tus productos se agregará tu
                                                    logo.
                                                </div>
                                            }
                                        />
                                        <Form.control.toggle<SettingUpdateDto>
                                            name={"is_product_wallpaper"}
                                            title="Se agregará wallpaper para la categorías."
                                            question={
                                                <div class="w-[150px]">
                                                    Solo activar para negocios
                                                    que quieren mostrar
                                                    wallpaper en la seccion de
                                                    productos home.
                                                </div>
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                        <footer
                            class="flex gap-2 px-4 shadow-md items-center text-xs justify-between font-semibold parent_footer"
                            style={{
                                backgroundColor: bg_color_footer,
                            }}
                        >
                            <style jsx>{`
                                .parent_footer span {
                                    ${isColorLight(bg_color_footer)
                                        ? "color: #000000 !important"
                                        : "color: #FFFFFF !important"};
                                }
                            `}</style>
                            <span class="text-center">
                                All right Copyrigther {new Date().getFullYear()}
                            </span>
                            <a
                                href="#start"
                                type="button"
                                class="py-4 px-6 text-white"
                                aria-label="up"
                                style={{
                                    backgroundColor: bg_color,
                                }}
                            >
                                <i class="fa-solid fa-caret-up" />
                            </a>
                            <span class="text-center">
                                Este es el pie de página
                            </span>
                        </footer>
                        {/* <NavTabs
                                        totalProducts={1}
                                        background={bg_color_responsive}
                                    /> */}
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-2 items-center">
                <div class="flex flex-col gap-2">
                    <div>
                        <span class="text-xs dark:text-white font-semibold">
                            Tipo de Icono Weight
                        </span>
                        <div class="flex gap-2">
                            <button
                                class={`min-w-[60px] h-[60px] rounded-md hover:bg-paper-light hover:dark:bg-admin-terciary border border-gray-300 ${
                                    type_icons_bars === "normal"
                                        ? "bg-paper-light dark:bg-admin-terciary"
                                        : ""
                                }`}
                                type="button"
                                onClick={() =>
                                    form.setValue("type_icons_bars", "normal")
                                }
                            >
                                <i class="fas fa-shopping-cart text-lg dark:text-white" />
                            </button>
                            <button
                                class={`min-w-[60px] h-[60px] rounded-md hover:bg-paper-light hover:dark:bg-admin-terciary border border-gray-300 ${
                                    type_icons_bars === "light"
                                        ? "bg-paper-light dark:bg-admin-terciary"
                                        : ""
                                }`}
                                type="button"
                                onClick={() =>
                                    form.setValue("type_icons_bars", "light")
                                }
                            >
                                <i class="far fa-shopping-cart text-lg dark:text-white" />
                            </button>
                        </div>
                    </div>
                    <div>
                        <span class="text-xs dark:text-white font-semibold">
                            Tipo de Icono
                        </span>
                        <div class="flex gap-2">
                            <button
                                class={`min-w-[60px] h-[60px] rounded-md hover:bg-paper-light hover:dark:bg-admin-terciary border border-gray-300 ${
                                    type_cart === "fas fa-shopping-cart"
                                        ? "bg-paper-light dark:bg-admin-terciary"
                                        : ""
                                }`}
                                type="button"
                                onClick={() =>
                                    form.setValue(
                                        "type_cart",
                                        "fas fa-shopping-cart"
                                    )
                                }
                            >
                                <i
                                    class={`fa${
                                        type_cart === "normal" ? "s" : "r"
                                    } fa-shopping-cart text-lg dark:text-white`}
                                />
                            </button>
                            <button
                                class={`min-w-[60px] h-[60px] rounded-md hover:bg-paper-light hover:dark:bg-admin-terciary border border-gray-300 ${
                                    type_cart === "fas fa-shopping-bag"
                                        ? "bg-paper-light dark:bg-admin-terciary"
                                        : ""
                                }`}
                                type="button"
                                onClick={() =>
                                    form.setValue(
                                        "type_cart",
                                        "fas fa-shopping-bag"
                                    )
                                }
                            >
                                <i
                                    class={`fa${
                                        type_icons_bars === "normal" ? "s" : "r"
                                    } fa-shopping-bag text-lg dark:text-white`}
                                />
                            </button>
                            <button
                                class={`min-w-[60px] h-[60px] rounded-md hover:bg-paper-light hover:dark:bg-admin-terciary border border-gray-300 ${
                                    type_cart === "fas fa-shopping-basket"
                                        ? "bg-paper-light dark:bg-admin-terciary"
                                        : ""
                                }`}
                                type="button"
                                onClick={() =>
                                    form.setValue(
                                        "type_cart",
                                        "fas fa-shopping-basket"
                                    )
                                }
                            >
                                <i
                                    class={`fa${
                                        type_icons_bars === "normal" ? "s" : "r"
                                    } fa-shopping-basket text-lg dark:text-white`}
                                />
                            </button>
                        </div>
                    </div>
                    <div>
                        <span class="text-xs dark:text-white font-semibold">
                            Tipo de Estrella
                        </span>
                        <div class="flex gap-2">
                            <button
                                class={`min-w-[60px] h-[60px] rounded-md hover:bg-paper-light hover:dark:bg-admin-terciary border border-gray-300 ${
                                    type_star === "star"
                                        ? "bg-paper-light dark:bg-admin-terciary"
                                        : ""
                                }`}
                                type="button"
                                onClick={() =>
                                    form.setValue("type_star", "star")
                                }
                            >
                                <i
                                    class={`fa${
                                        type_icons_bars === "normal" ? "s" : "r"
                                    } fa-star text-lg dark:text-white`}
                                />
                            </button>
                            <button
                                class={`min-w-[60px] h-[60px] rounded-md hover:bg-paper-light hover:dark:bg-admin-terciary border border-gray-300 ${
                                    type_star === "heart"
                                        ? "bg-paper-light dark:bg-admin-terciary"
                                        : ""
                                }`}
                                type="button"
                                onClick={() =>
                                    form.setValue("type_star", "heart")
                                }
                            >
                                <i
                                    class={`fa${
                                        type_icons_bars === "normal" ? "s" : "r"
                                    } fa-heart text-lg dark:text-white`}
                                />
                            </button>
                        </div>
                    </div>
                </div>

                <div class="flex flex-col gap-2">
                    <div>
                        <span class="text-xs dark:text-white font-semibold">
                            Tipo de Fuente
                        </span>
                        <div class="flex gap-2 flex-wrap">
                            <div class="flex flex-col gap-1">
                                <div class="flex gap-1">
                                    <button
                                        class={`min-w-[60px] h-[60px] rounded-md hover:bg-paper-light hover:dark:bg-admin-terciary border border-gray-300 ${
                                            font_face === "Exo"
                                                ? "bg-paper-light dark:bg-admin-terciary"
                                                : ""
                                        } font-semibold text-xs dark:text-white`}
                                        type="button"
                                        onClick={() => {
                                            form.setValue("font_face", "Exo");
                                        }}
                                    >
                                        Exo
                                    </button>
                                    <button
                                        class={`min-w-[60px] h-[60px] rounded-md hover:bg-paper-light hover:dark:bg-admin-terciary border border-gray-300 ${
                                            font_face === "Poppins"
                                                ? "bg-paper-light dark:bg-admin-terciary"
                                                : ""
                                        } font-semibold text-xs dark:text-white`}
                                        type="button"
                                        onClick={() => {
                                            form.setValue(
                                                "font_face",
                                                "Poppins"
                                            );
                                        }}
                                    >
                                        Poppins
                                    </button>
                                    <button
                                        class={`min-w-[60px] h-[60px] rounded-md hover:bg-paper-light hover:dark:bg-admin-terciary border border-gray-300 ${
                                            font_face === "Barlow"
                                                ? "bg-paper-light dark:bg-admin-terciary"
                                                : ""
                                        } font-semibold text-xs dark:text-white`}
                                        type="button"
                                        onClick={() => {
                                            form.setValue(
                                                "font_face",
                                                "Barlow"
                                            );
                                        }}
                                    >
                                        Barlow
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <span class="text-xs dark:text-white font-semibold">
                            Tipo de Animacion Scroll
                        </span>
                        <div class="flex gap-2 flex-wrap">
                            <div class="flex flex-col gap-1">
                                <div class="flex gap-1">
                                    <button
                                        class={`min-w-[60px] h-[60px] rounded-md hover:bg-paper-light hover:dark:bg-admin-terciary border border-gray-300 ${
                                            type_animation === "fade-up"
                                                ? "bg-paper-light dark:bg-admin-terciary"
                                                : ""
                                        } font-semibold text-xs dark:text-white`}
                                        type="button"
                                        onClick={() => {
                                            form.setValue(
                                                "type_animation",
                                                "fade-up"
                                            );
                                        }}
                                    >
                                        Fade Up
                                    </button>
                                    <button
                                        class={`min-w-[60px] h-[60px] rounded-md hover:bg-paper-light hover:dark:bg-admin-terciary border border-gray-300 ${
                                            type_animation === "zoom-in"
                                                ? "bg-paper-light dark:bg-admin-terciary"
                                                : ""
                                        } font-semibold text-xs dark:text-white`}
                                        type="button"
                                        onClick={() => {
                                            form.setValue(
                                                "type_animation",
                                                "zoom-in"
                                            );
                                        }}
                                    >
                                        Zoom In
                                    </button>
                                    <button
                                        class={`min-w-[60px] h-[60px] rounded-md hover:bg-paper-light hover:dark:bg-admin-terciary border border-gray-300 ${
                                            type_animation === "flip-left"
                                                ? "bg-paper-light dark:bg-admin-terciary"
                                                : ""
                                        } font-semibold text-xs dark:text-white`}
                                        type="button"
                                        onClick={() => {
                                            form.setValue(
                                                "type_animation",
                                                "flip-left"
                                            );
                                        }}
                                    >
                                        Flip Left
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 md:gap-2 items-center">
                <div>
                    <span class="text-xs dark:text-white font-semibold">
                        Tipo Bars
                    </span>
                    <div class="flex gap-2 flex-wrap">
                        {HAMBURGUERS.map((hbm) => (
                            <button
                                key={hbm}
                                class={`min-w-[60px] h-[60px] rounded-md hover:bg-paper-light hover:dark:bg-admin-terciary border border-gray-300 ${
                                    hamburger === hbm
                                        ? "bg-paper-light dark:bg-admin-terciary"
                                        : ""
                                }`}
                                type="button"
                                onClick={() => form.setValue("hamburger", hbm)}
                            >
                                <i
                                    class={`${hbm.replace(
                                        "fas",
                                        type_icons_bars === "normal"
                                            ? "fas"
                                            : "far"
                                    )} text-lg dark:text-white`}
                                />
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <div>
                        <span class="text-xs dark:text-white font-semibold">
                            Tipo Arrow
                        </span>
                        <div class="flex gap-2 flex-wrap">
                            {(
                                [
                                    "first",
                                    "second",
                                    "third",
                                ] as (typeof type_arrow)[]
                            ).map((arrow) => (
                                <button
                                    key={arrow}
                                    class={`min-w-[60px] h-[60px]  rounded-md hover:bg-paper-light hover:dark:bg-admin-terciary border border-gray-300 ${
                                        type_arrow === arrow
                                            ? "bg-paper-light dark:bg-admin-terciary"
                                            : ""
                                    }`}
                                    type="button"
                                    onClick={() =>
                                        form.setValue("type_arrow", arrow)
                                    }
                                >
                                    {/* <SamplePrevArrow
                                                    isSetting={arrow}
                                                /> */}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <span class="text-xs dark:text-white font-semibold">
                            Idioma
                        </span>
                        <div class="flex gap-2 flex-wrap">
                            <Form.control.toggle
                                title=""
                                name={"isActive"}
                                question="¿La web tendrá traductor de idiomas?"
                            />
                            {true ? (
                                <div class="grid grid-cols-1">
                                    <div class="grid grid-cols-2 gap-2">
                                        <Form.control.select
                                            title="Type Language Button"
                                            name={"multi_lenguaje.type"}
                                            array={LANGUAGES_SELECT_TYPE.map(
                                                (val) => ({
                                                    key: val,
                                                    value: val,
                                                })
                                            )}
                                            placeholder="Escoger tipo de lenguaje"
                                        />
                                        <Form.control.select
                                            title="Default Language"
                                            name={"multi_lenguaje.default"}
                                            array={LANGUAGES_SELECT.map(
                                                (val) => ({
                                                    key: val,
                                                    value: val,
                                                })
                                            )}
                                            placeholder="Escoger default de lenguaje"
                                        />
                                    </div>
                                    <div>
                                        <span class="text-xs dark:text-white font-semibold">
                                            Lenguajes
                                        </span>
                                        <div class=" grid grid-cols-7 gap-2">
                                            {LANGUAGES_SELECT.map((lang) => {
                                                const exist =
                                                    multi_lenguaje?.languages.some(
                                                        (v) => v === lang
                                                    );

                                                return (
                                                    <button
                                                        class={`${
                                                            exist
                                                                ? "bg-paper-light dark:bg-admin-terciary font-semibold  dark:text-white"
                                                                : ""
                                                        } rounded-md hover:bg-paper-light hover:dark:bg-admin-terciary border border-gray-300  font-semibold text-xs dark:text-white`}
                                                        key={lang}
                                                        onClick={() => {
                                                            if (exist) {
                                                                const filterLanguages =
                                                                    multi_lenguaje?.languages.filter(
                                                                        (v) =>
                                                                            v !==
                                                                            lang
                                                                    );
                                                                form.setValue(
                                                                    "multi_lenguaje.languages",
                                                                    filterLanguages ||
                                                                        []
                                                                );
                                                                return;
                                                            }
                                                            form.setValue(
                                                                "multi_lenguaje.languages",
                                                                [
                                                                    ...(multi_lenguaje?.languages ||
                                                                        []),
                                                                    lang,
                                                                ]
                                                            );
                                                        }}
                                                        type="button"
                                                    >
                                                        {lang}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
                <div class="flex flex-col">
                    <div>
                        <span class="text-xs dark:text-white font-semibold">
                            Tipo de Header
                        </span>
                        <div class="flex gap-2 flex-wrap">
                            <div class="flex flex-col gap-1">
                                <div class="flex gap-1">
                                    <button
                                        class={`min-w-[60px] h-[60px] rounded-md hover:bg-paper-light hover:dark:bg-admin-terciary border border-gray-300 ${
                                            header_type === "normal"
                                                ? "bg-paper-light dark:bg-admin-terciary"
                                                : ""
                                        } font-semibold text-xs dark:text-white`}
                                        type="button"
                                        onClick={() => {
                                            form.setValue(
                                                "header_type",
                                                "normal"
                                            );
                                        }}
                                    >
                                        Normal
                                    </button>
                                    <button
                                        class={`min-w-[60px] h-[60px] rounded-md hover:bg-paper-light hover:dark:bg-admin-terciary border border-gray-300 ${
                                            header_type === "search"
                                                ? "bg-paper-light dark:bg-admin-terciary"
                                                : ""
                                        } font-semibold text-xs dark:text-white`}
                                        type="button"
                                        onClick={() => {
                                            form.setValue(
                                                "header_type",
                                                "search"
                                            );
                                        }}
                                    >
                                        Search
                                    </button>
                                    <button
                                        class={`min-w-[60px] h-[60px] rounded-md hover:bg-paper-light hover:dark:bg-admin-terciary border border-gray-300 ${
                                            header_type === "search2"
                                                ? "bg-paper-light dark:bg-admin-terciary"
                                                : ""
                                        } font-semibold text-xs dark:text-white`}
                                        type="button"
                                        onClick={() => {
                                            form.setValue(
                                                "header_type",
                                                "search2"
                                            );
                                        }}
                                    >
                                        Search 2
                                    </button>
                                    <button
                                        class={`min-w-[60px] h-[60px] rounded-md hover:bg-paper-light hover:dark:bg-admin-terciary border border-gray-300 ${
                                            header_type === "transparent"
                                                ? "bg-paper-light dark:bg-admin-terciary"
                                                : ""
                                        } font-semibold text-xs dark:text-white`}
                                        type="button"
                                        onClick={() => {
                                            form.setValue(
                                                "header_type",
                                                "transparent"
                                            );
                                        }}
                                    >
                                        Transparent
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <span class="text-xs dark:text-white font-semibold">
                            Tipo de Background
                        </span>
                        <div class="flex gap-2 flex-wrap">
                            <div class="flex flex-col gap-1">
                                <div class="flex gap-1">
                                    <button
                                        class={`min-w-[60px] h-[60px] rounded-md hover:bg-paper-light hover:dark:bg-admin-terciary border border-gray-300 ${
                                            background_type === "first"
                                                ? "bg-paper-light dark:bg-admin-terciary"
                                                : ""
                                        } font-semibold text-xs dark:text-white`}
                                        type="button"
                                        onClick={() => {
                                            form.setValue(
                                                "background_type",
                                                "first"
                                            );
                                        }}
                                    >
                                        First
                                    </button>
                                    <button
                                        class={`min-w-[60px] h-[60px] rounded-md hover:bg-paper-light hover:dark:bg-admin-terciary border border-gray-300 ${
                                            background_type === "second"
                                                ? "bg-paper-light dark:bg-admin-terciary"
                                                : ""
                                        } font-semibold text-xs dark:text-white`}
                                        type="button"
                                        onClick={() => {
                                            form.setValue(
                                                "background_type",
                                                "second"
                                            );
                                        }}
                                    >
                                        Second
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <span class="text-xs dark:text-white font-semibold">
                            Background Position
                        </span>
                        <div class="flex gap-2 flex-wrap">
                            <div class="flex flex-col gap-1">
                                <div class="flex gap-1">
                                    <button
                                        class={`min-w-[60px] h-[60px] rounded-md hover:bg-paper-light hover:dark:bg-admin-terciary border border-gray-300 ${
                                            background_position === "start"
                                                ? "bg-paper-light dark:bg-admin-terciary"
                                                : ""
                                        } font-semibold text-xs dark:text-white`}
                                        type="button"
                                        onClick={() => {
                                            form.setValue(
                                                "background_position",
                                                "start"
                                            );
                                        }}
                                    >
                                        Start
                                    </button>
                                    <button
                                        class={`min-w-[60px] h-[60px] rounded-md hover:bg-paper-light hover:dark:bg-admin-terciary border border-gray-300 ${
                                            background_position === "center"
                                                ? "bg-paper-light dark:bg-admin-terciary"
                                                : ""
                                        } font-semibold text-xs dark:text-white`}
                                        type="button"
                                        onClick={() => {
                                            form.setValue(
                                                "background_position",
                                                "center"
                                            );
                                        }}
                                    >
                                        Center
                                    </button>
                                    <button
                                        class={`min-w-[60px] h-[60px] rounded-md hover:bg-paper-light hover:dark:bg-admin-terciary border border-gray-300 ${
                                            background_position === "end"
                                                ? "bg-paper-light dark:bg-admin-terciary"
                                                : ""
                                        } font-semibold text-xs dark:text-white`}
                                        type="button"
                                        onClick={() => {
                                            form.setValue(
                                                "background_position",
                                                "end"
                                            );
                                        }}
                                    >
                                        End
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 md:gap-2 items-center">
                <div class="flex flex-col">
                    <div>
                        <span class="text-xs dark:text-white font-semibold">
                            Border de los titulos
                        </span>
                        <div class="flex gap-2 flex-wrap">
                            <div class="flex flex-col gap-1">
                                <div class="flex gap-1">
                                    {(
                                        [
                                            "normal",
                                            "circle",
                                            "border",
                                            "null",
                                        ] as (typeof border_title_type)[]
                                    ).map((border) => (
                                        <button
                                            key={border}
                                            class={`min-w-[60px] h-[60px] rounded-md hover:bg-paper-light hover:dark:bg-admin-terciary border border-gray-300 ${
                                                border_title_type === border
                                                    ? "bg-paper-light dark:bg-admin-terciary"
                                                    : ""
                                            } font-semibold text-xs dark:text-white`}
                                            type="button"
                                            onClick={() => {
                                                form.setValue(
                                                    "border_title_type",
                                                    border
                                                );
                                            }}
                                        >
                                            {border}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <span class="text-xs dark:text-white font-semibold">
                        Loading
                    </span>
                    <div class="flex gap-2 flex-wrap">
                        <div class="flex flex-col gap-1">
                            <div class="grid grid-cols-3 gap-1">
                                {(
                                    [
                                        "one",
                                        "two",
                                        "three",
                                        "four",
                                        "null",
                                    ] as SettingSchema["type_loader"][]
                                ).map((val) => (
                                    <button
                                        key={val}
                                        class={`flex justify-center items-center min-w-[70px] h-[70px] rounded-md hover:bg-paper-light hover:dark:bg-admin-terciary border border-gray-300 ${
                                            type_loader === val
                                                ? "bg-paper-light dark:bg-admin-terciary"
                                                : ""
                                        } font-semibold text-xs dark:text-white`}
                                        type="button"
                                        onClick={() => {
                                            form.setValue("type_loader", val);
                                        }}
                                    >
                                        {/* {val === "one" ? (
                                                        <LoaderOne />
                                                    ) : val === "two" ? (
                                                        <LoaderTwo />
                                                    ) : val === "three" ? (
                                                        <LoaderThree />
                                                    ) : val === "four" ? (
                                                        <LoaderFour />
                                                    ) : (
                                                        "null"
                                                    )} */}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SettingConfiguracionUpdate;
