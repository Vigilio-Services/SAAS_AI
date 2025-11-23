import Button from "@components/extras/button";
import Image from "@components/extras/image";
import Tabs from "@components/extras/tabs";
import Title from "@components/extras/title";
import Form from "@components/form";
import { useEmpresaContext } from "@contexts/empresa.context";
import { animationFadeInUpTailwind, cn, sizeIcon } from "@libs/client/helpers";
import { useSignal } from "@preact/signals";
import EmpresaBrandingUpdate from "@services/empresa/components/empresa.branding.update";
import EmpresaInformacionUpdate from "@services/empresa/components/empresa.informacion.update";
import EmpresaRedUpdate from "@services/empresa/components/empresa.red.update";
import {
    type EmpresaUpdateDto,
    empresaUpdateDto,
} from "@services/empresa/dtos/empresa.dto";
import {
    BuildingsIconLight,
    BullseyeArrowIconLight,
    CreditCardIconLight,
    FloppyDiskPenIconLight,
    GlobeIconLight,
    ImageIconLight,
    LinkedinInIconBrand,
} from "@vigilio/react-icons";
import { valibotResolver } from "@vigilio/valibot/resolver";
import { useForm } from "react-hook-form";

export type ConfiguracionTab =
    | "general-info-tab"
    | "social-media-tab"
    | "branding"
    | "metodos-de-pago"
    | "seo";
function ConfiguracionPage() {
    const empresaContext = useEmpresaContext();

    const configuracion_tab = useSignal<ConfiguracionTab>("general-info-tab");

    const empresaUpdateForm = useForm<EmpresaUpdateDto>({
        resolver: valibotResolver(empresaUpdateDto),
        defaultValues: empresaContext.empresa,
    });

    function onEmpresaUpdate(body: EmpresaUpdateDto) {}

    return (
        <div className="flex flex-col gap-6">
            {/* Header */}
            <div class="flex justify-between items-center gap-3">
                <Title
                    title="Configuración"
                    subtitle="Manage your company profile, branding, and configuration"
                />
                <div class="mr-2">
                    <Button className="flex gap-2!" type="submit">
                        <FloppyDiskPenIconLight {...sizeIcon.large} /> Guardar
                    </Button>
                </div>
            </div>
            <div class="flex  flex-col gap-4 md:gap-0">
                <Tabs
                    className="bg-background"
                    activeTab={configuracion_tab.value}
                    onTabChange={(tabId) => {
                        configuracion_tab.value = tabId as ConfiguracionTab;
                    }}
                    tabs={[
                        {
                            id: "general-info-tab" satisfies ConfiguracionTab,
                            label: (
                                <div class="flex items-center gap-2 fill-foreground">
                                    <BuildingsIconLight {...sizeIcon.small} />{" "}
                                    Información general
                                </div>
                            ),
                        },
                        {
                            id: "social-media-tab" satisfies ConfiguracionTab,
                            label: (
                                <div class="flex items-center gap-2 fill-foreground">
                                    <GlobeIconLight {...sizeIcon.small} /> Redes
                                    sociales
                                </div>
                            ),
                        },
                        {
                            id: "branding" satisfies ConfiguracionTab,
                            label: (
                                <div class="flex items-center gap-2 fill-foreground">
                                    <ImageIconLight {...sizeIcon.small} />{" "}
                                    Branding
                                </div>
                            ),
                        },
                        {
                            id: "metodos-de-pago" satisfies ConfiguracionTab,
                            label: (
                                <div class="flex items-center gap-2 test-extra">
                                    <CreditCardIconLight {...sizeIcon.small} />{" "}
                                    Métodos de pago
                                </div>
                            ),
                        },
                        {
                            id: "seo" satisfies ConfiguracionTab,
                            label: (
                                <div class="flex items-center gap-2 fill-foreground">
                                    <BullseyeArrowIconLight
                                        {...sizeIcon.small}
                                    />{" "}
                                    SEO Y Rastreamiento
                                </div>
                            ),
                        },
                    ]}
                    isCustomContent
                />
                <div class="bg-card border-border  border-x border-b">
                    <Form
                        className="p-8 max-w-3xl"
                        {...empresaUpdateForm}
                        onSubmit={onEmpresaUpdate}
                    >
                        <EmpresaInformacionUpdate
                            configuracion_tab={configuracion_tab.value}
                            form={empresaUpdateForm}
                        />
                        <EmpresaRedUpdate
                            configuracion_tab={configuracion_tab.value}
                            form={empresaUpdateForm}
                        />
                        <EmpresaBrandingUpdate
                            configuracion_tab={configuracion_tab.value}
                        />
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default ConfiguracionPage;
