import Form from "@components/form";
import { cn } from "@libs/client/helpers";
import { ConfiguracionPerzonalizacionTab } from "src/pages/dashboard/configuracion/personalizacion";
import { SettingUpdateDto } from "../dtos/setting.dto";

interface SettingDisponibilidadProps {
    configuracion_tab: ConfiguracionPerzonalizacionTab;
}
function SettingDisponibilidad({
    configuracion_tab,
}: SettingDisponibilidadProps) {
    return (
        <div
            class={cn(
                "grid md:grid-cols-2 xl:grid-cols-3 gap-6",
                configuracion_tab !== "disponibilidad" && "hidden"
            )}
        >
            <Form.control.check<SettingUpdateDto>
                title="¿Modo Nocturno?"
                subtitle="¿Deseas que tu web tenga modo nocturno?"
                name={"is_dark"}
            />
            <Form.control.check
                title="Bloquear Aside"
                name={"is_block_aside"}
                subtitle="Bloquear Aside"
            />
            <Form.control.check<SettingUpdateDto>
                title="Web Eccomerce?"
                name={"is_ecommerce"}
                subtitle="No se venderá productos, no tendra carrito de compras, etc. Solo será landing page o venderas servicios?"
            />
            <Form.control.check<SettingUpdateDto>
                title="¿Registrar?"
                name={"is_login"}
                subtitle="No se podrán registrar clientes si está desactivado"
            />
            <Form.control.check<SettingUpdateDto>
                title="¿Agregar subcategorias"
                name={"is_subcategory"}
                subtitle="¿Tu web solo permite categorías a tus productos? Con esto activado, podrás agregar
                                        subcategorías. "
            />
            <Form.control.check<SettingUpdateDto>
                title="¿Tendrá cuotas los productos?"
                name={"is_cuota"}
                subtitle="Los productos tendrán un campo más para agregar cuotas. Solo esta disponible para productos normal"
            />{" "}
            <Form.control.check<SettingUpdateDto>
                name="position_header"
                title="Header Mobile"
                subtitle="¿Deseas que el header sea visible en el móvil?"
            />
            <Form.control.check<SettingUpdateDto>
                name="is_hidde_total_cart"
                title="Ocultar carrito Total"
                subtitle="Ocultar total en el header"
            />
        </div>
    );
}
export default SettingDisponibilidad;
