import Button from "@components/extras/button";
import Tabs from "@components/extras/tabs";
import Title from "@components/extras/title";
import { sizeIcon } from "@libs/client/helpers";
import { useSignal } from "@preact/signals";
import EmpresaMetodoPagoUpdate from "@services/empresa/components/empresa.metodo_pago.update";
import EmpresaPaymentUpdate from "@services/empresa/components/empresa.payment.update";
import {
    CreditCardIconLight,
    DisplayChartUpCircleCurrencyIconLight,
    FloppyDiskPenIconLight,
} from "@vigilio/react-icons";

export type ConfiguracionMetodoPagoTab = "configuracion-pagos" | "metodos-pago";
function MetodosPagoPage() {
    const configuracion_tab = useSignal<ConfiguracionMetodoPagoTab>(
        "configuracion-pagos"
    );
    return (
        <div className="flex flex-col gap-4">
            {/* Header */}
            <div class="flex justify-between items-center gap-3">
                <Title
                    title="Métodos de pago"
                    subtitle="Manage your company profile, branding, and configuration"
                />
                <div class="mr-2">
                    <Button className="flex gap-2!" type="submit">
                        <FloppyDiskPenIconLight {...sizeIcon.large} /> Guardar
                    </Button>
                </div>
            </div>{" "}
            <div class="flex  flex-col gap-4 md:gap-0">
                <Tabs
                    className="bg-background"
                    activeTab={configuracion_tab.value}
                    onTabChange={(tabId) => {
                        configuracion_tab.value =
                            tabId as ConfiguracionMetodoPagoTab;
                    }}
                    tabs={[
                        {
                            id: "configuracion-pagos" satisfies ConfiguracionMetodoPagoTab,
                            label: (
                                <div class="flex items-center gap-2 fill-foreground">
                                    <DisplayChartUpCircleCurrencyIconLight
                                        {...sizeIcon.small}
                                    />{" "}
                                    Configuración de pagos
                                </div>
                            ),
                        },
                        {
                            id: "metodos-pago" satisfies ConfiguracionMetodoPagoTab,
                            label: (
                                <div class="flex items-center gap-2 fill-foreground">
                                    <CreditCardIconLight {...sizeIcon.small} />{" "}
                                    Métodos de pago
                                </div>
                            ),
                        },
                    ]}
                    isCustomContent
                />
                <div class=" border-border  border-x border-b p-6">
                    <EmpresaPaymentUpdate
                        configuracion_payment_tab={configuracion_tab.value}
                    />
                    <EmpresaMetodoPagoUpdate
                        configuracion_metodo_pago_tab={configuracion_tab.value}
                    />
                </div>
            </div>
        </div>
    );
}

export default MetodosPagoPage;
