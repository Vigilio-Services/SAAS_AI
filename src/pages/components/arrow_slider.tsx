/** biome-ignore-all lint/a11y/noStaticElementInteractions: <explanation> */
import { useEmpresaContext } from "@contexts/empresa.context";
import { sizeIcon } from "@libs/client/helpers";
import { SettingSchema } from "@services/empresa/schemas/setting.schema";
import {
    ArrowLeftLongIconLight,
    ArrowLeftLongIconSolid,
    CaretLeftIconLight,
    CaretLeftIconSolid,
    ChevronLeftIconLight,
    ChevronLeftIconSolid,
} from "@vigilio/react-icons";
import type { HTMLAttributes, JSX } from "preact/compat";

export function SampleNextArrow(props: HTMLAttributes<HTMLDivElement>) {
    const { className, onClick } = props;
    const empresaContext = useEmpresaContext();
    const setting = empresaContext?.empresa?.setting;
    return (
        <div class="md:group-hover:opacity-100 md:opacity-0 delay-custom-1">
            <div className={className} onClick={onClick}>
                {setting?.type_arrow === "first" ? (
                    <>
                        <i class="fas fa-caret-right text-xl text-primary" />
                        <style jsx>{`
                            .slick-arrow,
                            .slick-arrow {
                                display: flex !important;
                                justify-content: center !important;
                                align-items: center !important;
                                width: 30px !important;
                                height: 30px !important;
                                position: absolute !important;
                                z-index: 10;
                                border-radius: 0.5rem !important;
                            }
                            .slick-next {
                                right: 5px !important;
                            }
                            .slick-prev {
                                left: 5px !important;
                            }
                            .slick-prev::before,
                            .slick-next::before {
                                display: none !important;
                            }
                            .slick-prev:hover,
                            .slick-prev:focus,
                            .slick-next:hover,
                            .slick-next:focus {
                                scale: 1.1 !important;
                                background-color: rgba(0, 0, 0, 0.4) !important;
                                box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1),
                                    0 2px 4px -2px rgb(0 0 0 / 0.1);
                            }
                        `}</style>
                    </>
                ) : setting?.type_arrow === "second" ? (
                    <>
                        <i class="fal fa-long-arrow-right text-lg text-primary" />
                        <style jsx>{`
                            .slick-arrow,
                            .slick-arrow {
                                display: flex !important;
                                justify-content: center !important;
                                align-items: center !important;
                                width: 35px !important;
                                height: 35px !important;
                                position: absolute !important;
                                z-index: 10;
                                ${setting?.type_border === "circle"
                                    ? "border-radius: 0.5rem !important;"
                                    : ""}

                                border: 1px solid ${setting?.bg_color};
                            }
                            .slick-next {
                                right: 5px !important;
                            }
                            .slick-prev {
                                left: 5px !important;
                            }
                            .slick-prev::before,
                            .slick-next::before {
                                display: none !important;
                            }
                        `}</style>
                    </>
                ) : setting?.type_arrow === "third" ? (
                    <>
                        <i class="far fa-chevron-right text-xl text-primary" />
                        <style jsx>{`
                            .slick-arrow,
                            .slick-arrow {
                                display: flex !important;
                                justify-content: center !important;
                                align-items: center !important;
                                width: 35px !important;
                                height: 35px !important;
                                position: absolute !important;
                                z-index: 10;
                            }
                            .slick-next {
                                right: 5px !important;
                            }
                            .slick-prev {
                                left: 5px !important;
                            }
                            .slick-prev::before,
                            .slick-next::before {
                                display: none !important;
                            }
                        `}</style>
                    </>
                ) : null}{" "}
            </div>
        </div>
    );
}

export function SamplePrevArrow({
    type_arrow,
    type_icons_bars,
    ...props
}: HTMLAttributes<HTMLDivElement> & {
    type_arrow?: SettingSchema["type_arrow"];
    type_icons_bars?: SettingSchema["type_icons_bars"];
}) {
    const { className, onClick } = props;
    const empresaContext = useEmpresaContext();
    const setting = empresaContext?.empresa?.setting;
    const typeArrow = type_arrow ? type_arrow : setting?.type_arrow;
    const arrow: Record<SettingSchema["type_arrow"], JSX.Element> = {
        first:
            type_icons_bars === "normal" ? (
                <CaretLeftIconSolid {...sizeIcon.large} />
            ) : (
                <CaretLeftIconLight {...sizeIcon.large} />
            ),
        second:
            type_icons_bars === "normal" ? (
                <ArrowLeftLongIconSolid {...sizeIcon.large} />
            ) : (
                <ArrowLeftLongIconLight {...sizeIcon.large} />
            ),
        third:
            type_icons_bars === "normal" ? (
                <ChevronLeftIconSolid {...sizeIcon.large} />
            ) : (
                <ChevronLeftIconLight {...sizeIcon.large} />
            ),
    };
    return (
        <div
            class={`${
                typeArrow ? "" : "md:opacity-0  md:group-hover:opacity-100"
            } delay-custom-1`}
        >
            <div className={className} onClick={onClick}>
                {arrow[typeArrow] ||
                    (type_icons_bars === "normal" ? (
                        <CaretLeftIconSolid {...sizeIcon.large} />
                    ) : (
                        <CaretLeftIconLight {...sizeIcon.large} />
                    ))}
            </div>
        </div>
    );
}
