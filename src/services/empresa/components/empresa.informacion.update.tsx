import Button from "@components/extras/button";
import Hr from "@components/extras/hr";
import Form from "@components/form";
import { animationFadeInUpTailwind, sizeIcon } from "@libs/client/helpers";
import {
    AtIconLight,
    BuildingIconLight,
    MobileIconLight,
    PlusIconSolid,
    TrashIconLight,
} from "@vigilio/react-icons";
import { sweetModal } from "@vigilio/sweet";
import { useFieldArray, useForm } from "react-hook-form";
import { ConfiguracionTab } from "src/pages/dashboard/configuracion";
import { EmpresaUpdateDto } from "../dtos/empresa.dto";
import {
    TELEFONO_TYPE_ARRAY,
    TIPO_EMPRESA_ARRAY,
    TIPO_EMPRESA_LANG_ARRAY,
    TIPO_SERVICIO_ARRAY,
} from "../libs";

interface EmpresaInformacionUpdateProps {
    configuracion_tab: ConfiguracionTab;
    form: ReturnType<typeof useForm<EmpresaUpdateDto>>;
}
function EmpresaInformacionUpdate({
    configuracion_tab,

    form,
}: EmpresaInformacionUpdateProps) {
    const emailControl = useFieldArray({
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        name: "emails" as any,
        control: form.control,
    });
    const telephonesControl = useFieldArray({
        name: "telephones",
        control: form.control,
    });
    return (
        <div
            style={{
                display: configuracion_tab !== "general-info-tab" ? "none" : "",
            }}
            class={`${animationFadeInUpTailwind}  flex flex-col gap-6`}
        >
            <div class="grid sm:grid-cols-2 gap-6">
                <Form.control<EmpresaUpdateDto>
                    ico={<BuildingIconLight />}
                    name="name_empresa"
                    title="Nombre de la compañía"
                />
                <Form.control.select
                    ico={<BuildingIconLight />}
                    name="tipo_empresa.tipo_servicio_id"
                    array={TIPO_SERVICIO_ARRAY}
                    title="Tipo de servicio"
                    placeholder="Escoger tipo de servicio"
                    disabled
                />
                <Form.control.select
                    ico={<BuildingIconLight />}
                    name="type_empresa_id"
                    array={TIPO_EMPRESA_ARRAY}
                    title="Tipo de compañía"
                    placeholder="Escoger tipo de empresa"
                    disabled
                />
                <Form.control<EmpresaUpdateDto>
                    ico={<BuildingIconLight />}
                    name="type_empresa_other"
                    title="Mi compañía"
                />{" "}
                <Form.control
                    ico={<BuildingIconLight />}
                    name="dial_code"
                    title="Código de dial"
                    placeholder="Escoger dial code"
                    disabled
                />
                <Form.control
                    ico={<BuildingIconLight />}
                    name="timezone"
                    title="Zona de tiempo"
                    placeholder="Escoger zona de tiempo"
                    disabled
                />
                <Form.control.select
                    ico={<BuildingIconLight />}
                    name="lang"
                    array={TIPO_EMPRESA_LANG_ARRAY}
                    title="Idioma"
                    placeholder="Escoger idioma"
                    disabled
                />
                <Form.control<EmpresaUpdateDto>
                    type="date"
                    ico={<BuildingIconLight />}
                    name="year_founded"
                    title="Año de fundación"
                />
            </div>
            <Hr />
            <div class="flex flex-col gap-6">
                <div class="flex gap-6 items-center justify-between">
                    <label
                        class="flex gap-2 items-center fill-foreground"
                        htmlFor=""
                    >
                        <AtIconLight {...sizeIcon.medium} />
                        Correos Electrónicos
                    </label>
                    <Button
                        onClick={() => {
                            emailControl.append("");
                        }}
                        type="button"
                        variant="secondary"
                    >
                        <PlusIconSolid {...sizeIcon.small} />
                    </Button>
                </div>
                <div class="flex flex-col gap-6">
                    {emailControl.fields.map((field, i) => (
                        <div key={field.id} class="flex gap-6">
                            <Form.control<EmpresaUpdateDto>
                                type="email"
                                title={""}
                                placeholder="soporte@vigilio-services.com"
                                name={`emails.${i}`}
                            />
                            <Button
                                onClick={() => {
                                    sweetModal({
                                        title: "¿Estás seguro de querer eliminar este correo electrónico?",
                                    }).then(({ isConfirmed }) => {
                                        if (isConfirmed) {
                                            emailControl.remove(i);
                                        }
                                    });
                                }}
                                type="button"
                                variant="outline"
                                className="fill-destructive!   hover:[&>svg]:fill-white! hover:bg-destructive  border-destructive!"
                            >
                                <TrashIconLight {...sizeIcon.small} />
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
            <Hr />
            <div class="flex flex-col gap-6">
                <div class="flex gap-6 items-center justify-between">
                    <label
                        class="flex gap-2 items-center fill-foreground"
                        htmlFor=""
                    >
                        <MobileIconLight {...sizeIcon.medium} />
                        Teléfonos
                    </label>
                    <Button
                        onClick={() => {
                            telephonesControl.append({
                                type: "cellphone",
                                isReclamos: false,
                                value: "",
                            });
                        }}
                        type="button"
                        variant="secondary"
                    >
                        <PlusIconSolid {...sizeIcon.small} />
                    </Button>
                </div>
                <div class="flex flex-col gap-6">
                    {telephonesControl.fields.map((field, i) => (
                        <div key={field.id} class="flex gap-6">
                            <div class="w-[250px]">
                                <Form.control.select<EmpresaUpdateDto>
                                    array={TELEFONO_TYPE_ARRAY}
                                    title={""}
                                    placeholder="Tipo de teléfono"
                                    name={`telephones.${i}.type`}
                                />
                            </div>
                            <Form.control<EmpresaUpdateDto>
                                type="email"
                                title={""}
                                placeholder="9XXXXXX9"
                                name={`telephones.${i}.value`}
                            />
                            <Button
                                onClick={() => {
                                    sweetModal({
                                        title: "¿Estás seguro de querer eliminar este teléfono?",
                                    }).then(({ isConfirmed }) => {
                                        if (isConfirmed) {
                                            telephonesControl.remove(i);
                                        }
                                    });
                                }}
                                type="button"
                                variant="outline"
                                className="fill-destructive!   hover:[&>svg]:fill-white! hover:bg-destructive  border-destructive!"
                            >
                                <TrashIconLight {...sizeIcon.small} />
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default EmpresaInformacionUpdate;
