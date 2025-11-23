import Button from "@components/extras/button";
import Tabs from "@components/extras/tabs";
import Title from "@components/extras/title";
import Form from "@components/form";
import { useEmpresaContext } from "@contexts/empresa.context";
import { useThemeContext } from "@contexts/theme.context";
import useDropdown from "@hooks/useDropdown";
import { cn, isColorLight, sizeIcon } from "@libs/client/helpers";
import { printFileWithDimension } from "@libs/index";
import { useSignal } from "@preact/signals";
import SettingColoresUpdate from "@services/empresa/components/setting_colores.update";
import SettingConfiguracionUpdate from "@services/empresa/components/setting_configuracion.update";
import SettingDisponibilidad from "@services/empresa/components/setting_disponibilidad";
import SettingMenuUpdate from "@services/empresa/components/setting_menu.update";
import {
    SettingUpdateDto,
    settingUpdateDto,
} from "@services/empresa/dtos/setting.dto";
import {
    HAMBURGUERS,
    LANGUAGES_SELECT,
    LANGUAGES_SELECT_TYPE,
} from "@services/empresa/libs/setting.lib";
import { SettingSchema } from "@services/empresa/schemas/setting.schema";
import {
    BrushIconLight,
    FloppyDiskPenIconLight,
    GearIconLight,
    GridIconLight,
    ImageIconLight,
    ToggleLargeOnIconLight,
} from "@vigilio/react-icons";
import { valibotResolver } from "@vigilio/valibot/resolver";
import { useForm } from "react-hook-form";
import { Link } from "wouter-preact";

export type ConfiguracionPerzonalizacionTab =
    | "colores"
    | "settings"
    | "multimedia"
    | "disponibilidad"
    | "secciones-y-menus"
    | "multilenguaje";

function PersonalizacionPage() {
    const empresaContext = useEmpresaContext();
    const themeStore = useThemeContext();
    const headerDropdown = useDropdown();

    const configuracion_tab =
        useSignal<ConfiguracionPerzonalizacionTab>("colores");
    const settingUpdateform = useForm<SettingUpdateDto>({
        resolver: valibotResolver(settingUpdateDto),
        mode: "all",
        defaultValues: empresaContext.empresa.setting,
    });
    function onUpdateEmpresa(data: SettingUpdateDto) {
        console.log(data);
    }

    return (
        <div className="flex flex-col gap-4">
            {/* Header */}
            <div class="flex justify-between items-center gap-3">
                <Title
                    title="Personalización"
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
                        configuracion_tab.value =
                            tabId as ConfiguracionPerzonalizacionTab;
                    }}
                    tabs={[
                        {
                            id: "colores" satisfies ConfiguracionPerzonalizacionTab,
                            label: (
                                <div class="flex items-center gap-2 fill-foreground">
                                    <BrushIconLight {...sizeIcon.small} />{" "}
                                    Colores
                                </div>
                            ),
                        },
                        {
                            id: "settings" satisfies ConfiguracionPerzonalizacionTab,
                            label: (
                                <div class="flex items-center gap-2 fill-foreground">
                                    <GearIconLight {...sizeIcon.small} />{" "}
                                    Configuración
                                </div>
                            ),
                        },
                        {
                            id: "multimedia" satisfies ConfiguracionPerzonalizacionTab,
                            label: (
                                <div class="flex items-center gap-2 fill-foreground">
                                    <ImageIconLight {...sizeIcon.small} />{" "}
                                    Multimedia
                                </div>
                            ),
                        },
                        {
                            id: "secciones-y-menus" satisfies ConfiguracionPerzonalizacionTab,
                            label: (
                                <div class="flex items-center gap-2 fill-foreground">
                                    <GridIconLight {...sizeIcon.small} />{" "}
                                    Secciones y menus
                                </div>
                            ),
                        },
                        {
                            id: "disponibilidad" satisfies ConfiguracionPerzonalizacionTab,
                            label: (
                                <div class="flex items-center gap-2 fill-foreground">
                                    <ToggleLargeOnIconLight
                                        {...sizeIcon.small}
                                    />{" "}
                                    Disponibilidad
                                </div>
                            ),
                        },
                    ]}
                    isCustomContent
                />
                <div class="bg-card border-border  border-x border-b p-6">
                    <Form
                        className="flex gap-4 flex-col"
                        {...settingUpdateform}
                        onSubmit={onUpdateEmpresa}
                    >
                        {/* COLORES */}
                        <SettingColoresUpdate
                            configuracion_tab={configuracion_tab.value}
                        />

                        {/* DISPONIBILIDADES */}
                        <SettingDisponibilidad
                            configuracion_tab={configuracion_tab.value}
                        />
                        {/* SECCIONES Y MENUS */}
                        <SettingMenuUpdate
                            configuracion_tab={configuracion_tab.value}
                        />
                        <SettingConfiguracionUpdate
                            form={settingUpdateform}
                            configuracion_tab={configuracion_tab.value}
                        />
                        {!empresaContext.empresa?.is_production ? (
                            <></>
                        ) : (
                            // <FormControlEditorJS
                            //     name={"web_script" }
                            //     title="Personalización html script "
                            // />
                            <></>
                        )}

                        {/* <Form.button.submit
                            title="Actualizar"
                            className="self-start"
                            isLoading={empresaUpdateMutation.isLoading || false}
                            disabled={empresaUpdateMutation.isLoading || false}
                        /> */}
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default PersonalizacionPage;
