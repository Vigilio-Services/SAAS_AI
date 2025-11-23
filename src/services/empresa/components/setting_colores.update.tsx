import Form from "@components/form";
import { cn } from "@libs/client/helpers";
import { ConfiguracionPerzonalizacionTab } from "src/pages/dashboard/configuracion/personalizacion";
import { SettingUpdateDto } from "../dtos/setting.dto";

interface SettingColoresUpdateProps {
    configuracion_tab: ConfiguracionPerzonalizacionTab;
}
function SettingColoresUpdate({
    configuracion_tab,
}: SettingColoresUpdateProps) {
    return (
        <div
            class={cn(
                "grid grid-cols-2 md:grid-cols-3 gap-6",
                configuracion_tab !== "colores" && "hidden"
            )}
        >
            <Form.control.color<SettingUpdateDto>
                name={"bg_color"}
                title="color de tu web"
                question="Color de tu web"
            />
            <Form.control.color<SettingUpdateDto>
                name={"bg_color_responsive"}
                title="color responsive"
                question="Color de tu web en modo responsive"
            />
            <Form.control.color<SettingUpdateDto>
                name={"bg_color_background"}
                title="color de fondo"
                question="Color de fondo de tu web"
            />
            <Form.control.color<SettingUpdateDto>
                name={"bg_color_paper"}
                title="color de fondo2 "
                question="Color de fondo2 de tu web"
            />
            <Form.control.color<SettingUpdateDto>
                name={"bg_color_footer"}
                title="color del footer "
                question="Color de fondo2 de tu web"
            />
            <Form.control.color<SettingUpdateDto>
                name={"bg_color_button"}
                title="color del boton carrito"
            />
            <Form.control.color<SettingUpdateDto>
                name={"bg_color_secondary"}
                title="Color Secundario"
            />
            <Form.control.color<SettingUpdateDto>
                name={"bg_color_header"}
                title="Color Header Background"
            />
            <Form.control.color<SettingUpdateDto>
                name={"bg_color_aside"}
                title="Color Aside Responsive"
            />
            <Form.control.color<SettingUpdateDto>
                name={"text_color"}
                title="Forzar color texto"
            />
        </div>
    );
}

export default SettingColoresUpdate;
