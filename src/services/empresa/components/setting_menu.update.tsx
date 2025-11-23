import Form from "@components/form";
import { cn } from "@libs/client/helpers";
import { SettingUpdateDto } from "@services/empresa/dtos/setting.dto";
import { ConfiguracionPerzonalizacionTab } from "src/pages/dashboard/configuracion/personalizacion";

interface SettingMenuUpdateProps {
    configuracion_tab: ConfiguracionPerzonalizacionTab;
}
function SettingMenuUpdate({ configuracion_tab }: SettingMenuUpdateProps) {
    return (
        <div
            class={cn(
                "grid grid-cols-3 md:grid-cols-3",
                configuracion_tab !== "secciones-y-menus" && "hidden"
            )}
        >
            <Form.control.toggle<SettingUpdateDto>
                name={"shows.cards"}
                title="Sección Iconos"
            />
            <Form.control.toggle<SettingUpdateDto>
                name={"shows.map"}
                title="Sección Mapa"
            />
            <Form.control.toggle<SettingUpdateDto>
                name={"shows.brands"}
                title="Slider Marcas"
            />

            <Form.control.toggle<SettingUpdateDto>
                name={"shows.about"}
                title="Sección Nosotros"
            />
            <Form.control.toggle<SettingUpdateDto>
                name={"shows.android"}
                title="Tarjeta Android"
            />
            <Form.control.toggle<SettingUpdateDto>
                name={"shows.offers_section"}
                title="Seccion Ofertas"
            />

            <Form.control.toggle<SettingUpdateDto>
                name={"shows.offers_user"}
                title="Seccion Ofertas Usuarios"
            />
        </div>
    );
}

export default SettingMenuUpdate;
