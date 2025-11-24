import { IconType } from "@components/extras/types";
import {
    BagShoppingIconLight,
    BagShoppingIconSolid,
    BarsIconLight,
    BarsIconSolid,
    BasketShoppingIconLight,
    BasketShoppingIconSolid,
    BowlHotIconLight,
    BowlHotIconSolid,
    BurgerIconLight,
    BurgerIconSolid,
    CarIconLight,
    CarIconSolid,
    CartShoppingIconLight,
    CartShoppingIconSolid,
    GamepadIconLight,
    GamepadIconSolid,
    HeartIconLight,
    HeartIconSolid,
    PizzaSliceIconLight,
    PizzaSliceIconSolid,
    StarIconLight,
    StarIconSolid,
    UtensilsIconLight,
    UtensilsIconSolid,
} from "@vigilio/react-icons";
import { LanguagesUnion, SettingSchema } from "../schemas/setting.schema";

export function HAMBURGUERS(type_icons_bars: SettingSchema["type_icons_bars"]) {
    const normal = type_icons_bars === "normal";
    return {
        "pizza-slice": normal ? PizzaSliceIconSolid : PizzaSliceIconLight,
        soup: normal ? BowlHotIconSolid : BowlHotIconLight,
        car: normal ? CarIconSolid : CarIconLight,
        "utensils-alt": normal ? UtensilsIconSolid : UtensilsIconLight,
        "gamepad-alt": normal ? GamepadIconSolid : GamepadIconLight,
        hamburger: normal ? BurgerIconSolid : BurgerIconLight,
        bars: normal ? BarsIconSolid : BarsIconLight,
    };
}

export function TYPESTART(type_icons_bars: SettingSchema["type_icons_bars"]) {
    const normal = type_icons_bars === "normal";
    return {
        heart: normal ? HeartIconSolid : HeartIconLight,
        star: normal ? StarIconSolid : StarIconLight,
    };
}

export function TYPECART(
    type_icons_bars: SettingSchema["type_icons_bars"]
): Record<SettingSchema["type_cart"], IconType> {
    const normal = type_icons_bars === "normal";
    return {
        "shopping-cart": normal ? CartShoppingIconSolid : CartShoppingIconLight,
        "shopping-bag": normal ? BagShoppingIconSolid : BagShoppingIconLight,
        "shopping-basket": normal
            ? BasketShoppingIconSolid
            : BasketShoppingIconLight,
    };
}

export const LANGUAGES_SELECT: LanguagesUnion[] = [
    "es",
    "en",
    "zh-CN",
    "pt",
    "it",
    "tr",
    "fr",
    "zh-TW",
    "ru",
    "ar",
    "sv",
    "bg",
    "xh",
    "fy",
    "sd",
    "sn",
    "gd",
    "sm",
    "ps",
    "lb",
    "ky",
    "vi",
    "az",
    "sk",
    "fa",
    "mn",
    "pl",
    "ja",
    "ro",
    "ko",
    "ka",
    "cs",
    "la",
    "af",
    "sq",
    "tl",
    "sr",
    "id",
    "hi",
    "nl",
];
export const LANGUAGES_SELECT_TYPE = ["globe", "normal", "emergente"];
