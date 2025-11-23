import Form from "@components/form";
import { formSelectNumber } from "@components/form/FormSelect";
import { useEmpresaContext } from "@contexts/empresa.context";
import { animationFadeInUpTailwind } from "@libs/client/helpers";
import {
    FileInvoiceDollarIconLight,
    MoneyBillWaveIconLight,
    PercentIconLight,
} from "@vigilio/react-icons";
import { valibotResolver } from "@vigilio/valibot/resolver";
import { useForm } from "react-hook-form";
import { ConfiguracionMetodoPagoTab } from "src/pages/dashboard/configuracion/metodos_pago";
import {
    EmpresaPaymentUpdateDto,
    empresaPaymentUpdateDto,
} from "../dtos/empresa_payment.dto";
import { countries } from "../libs/country";

interface EmpresaPaymentUpdateProps {
    configuracion_payment_tab: ConfiguracionMetodoPagoTab;
}
function EmpresaPaymentUpdate({
    configuracion_payment_tab,
}: EmpresaPaymentUpdateProps) {
    const empresaContext = useEmpresaContext();
    const empresaPaymentUpdateForm = useForm<EmpresaPaymentUpdateDto>({
        resolver: valibotResolver(empresaPaymentUpdateDto),
        defaultValues: empresaContext.empresa.payment,
    });

    function onEmpresaPaymentUpdate(data: EmpresaPaymentUpdateDto) {
        console.log(data);
    }
    return (
        <Form
            {...empresaPaymentUpdateForm}
            onSubmit={onEmpresaPaymentUpdate}
            className={`${animationFadeInUpTailwind} ${
                configuracion_payment_tab !== "configuracion-pagos"
                    ? "hidden"
                    : ""
            }  grid  gap-4`}
        >
            <div class="grid md:grid-cols-2 gap-4">
                <Form.control
                    ico={<FileInvoiceDollarIconLight />}
                    name="tipo_impuesto"
                    title="Tipo de impuesto"
                    placeholder="Ingresar tipo de impuesto"
                    disabled
                />
                <Form.control
                    ico={<MoneyBillWaveIconLight />}
                    name="money.money"
                    title="Moneda"
                    disabled
                />
                <Form.control
                    ico={<MoneyBillWaveIconLight />}
                    name="money.simbolo"
                    title="Moneda"
                    disabled
                />
                <Form.control.select<EmpresaPaymentUpdateDto>
                    ico={<PercentIconLight />}
                    name="igv"
                    title="Valor de impuesto"
                    placeholder="Seleccionar valor de impuesto"
                    array={countries
                        .find(
                            (country) =>
                                country.dial_code ===
                                empresaContext.empresa.dial_code
                        )!
                        .impuestos.map((impuesto) => ({
                            key: impuesto,
                            value: `${impuesto}% ${
                                impuesto === 0 ? "(sin impuesto)" : ""
                            }`,
                        }))}
                    options={{ setValueAs: formSelectNumber }}
                />
            </div>
            <Form.control.check<EmpresaPaymentUpdateDto>
                name="enabled_igv"
                title="¿IGV habilitado?"
                subtitle="Habilitar el IGV"
            />
            <Form.control.check<EmpresaPaymentUpdateDto>
                name="is_dolar"
                title="¿Usa dólar?"
                subtitle="Habilitar el uso del dólar"
            />

            <Form.control.check<EmpresaPaymentUpdateDto>
                name="enabled_dni_cart"
                title="¿DNI en carrito habilitado?"
                subtitle="Habilitar el DNI en el carrito"
            />
            <Form.control.check<EmpresaPaymentUpdateDto>
                name="enabled_client_pay_comision"
                title="¿Cliente paga comisión?"
                subtitle="Habilitar el pago de comisión por el cliente"
            />
            <Form.control.check<EmpresaPaymentUpdateDto>
                name="enabled_sell_country"
                title="¿Venta por país habilitada?"
                subtitle="Habilitar la venta por país"
            />
        </Form>
    );
}

export default EmpresaPaymentUpdate;
