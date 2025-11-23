import Form from "@components/form";
import { animationFadeInUpTailwind, sizeIcon } from "@libs/client/helpers";
import { ImageIconLight } from "@vigilio/react-icons";
import { ConfiguracionTab } from "src/pages/dashboard/configuracion";

interface EmpresaBrandingUpdateProps {
    configuracion_tab: ConfiguracionTab;
}
function EmpresaBrandingUpdate({
    configuracion_tab,
}: EmpresaBrandingUpdateProps) {
    return (
        <div
            style={{
                display: configuracion_tab !== "branding" ? "none" : "",
            }}
            class={`${animationFadeInUpTailwind} grid md:grid-cols-2 gap-4`}
        >
            <Form.control.file
                title={
                    <div class="flex gap-2 items-center">
                        <ImageIconLight {...sizeIcon.small} />
                        <span>Logo</span>
                    </div>
                }
                name="logo"
            />
            <Form.control.file
                title={
                    <div class="flex gap-2 items-center">
                        <ImageIconLight {...sizeIcon.small} />
                        <span>Logo PWA</span>
                    </div>
                }
                name="logo_pwa"
            />
            <Form.control.file
                title={
                    <div class="flex gap-2 items-center">
                        <ImageIconLight {...sizeIcon.small} />
                        <span>Icono</span>
                    </div>
                }
                name="icon"
            />
        </div>
    );
}

export default EmpresaBrandingUpdate;
