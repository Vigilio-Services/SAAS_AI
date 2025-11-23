import Hr from "@components/extras/hr";
import Image from "@components/extras/image";
import Form from "@components/form";
import { useEmpresaContext } from "@contexts/empresa.context";
import { useThemeContext } from "@contexts/theme.context";
import { animationFadeInUpTailwind, cn, sizeIcon } from "@libs/client/helpers";
import {
    extensions,
    extensionsMim,
    typeTextExtensions,
} from "@services/uploads/libs/client";
import { formatMoney } from "@vigilio/express-core/helpers";
import {
    HandHoldingBoxIconLight,
    MoneyCheckIconLight,
    UserIconLight,
} from "@vigilio/react-icons";
import { valibotResolver } from "@vigilio/valibot/resolver";
import { Fragment } from "preact/jsx-runtime";
import { useForm } from "react-hook-form";
import { ConfiguracionMetodoPagoTab } from "src/pages/dashboard/configuracion/metodos_pago";
import {
    MetodoPagoUpdateDto,
    metodoPagoUpdateDto,
    metodoQrPlinUpdateQrDto,
    metodoQrYapeUpdateQrDto,
} from "../dtos/metodo_pago.dto";
import { countries } from "../libs/country";

interface EmpresaMetodoPagoUpdateProps {
    configuracion_metodo_pago_tab: ConfiguracionMetodoPagoTab;
}
function EmpresaMetodoPagoUpdate({
    configuracion_metodo_pago_tab,
}: EmpresaMetodoPagoUpdateProps) {
    const empresaStore = useEmpresaContext();
    const themeContext = useThemeContext();
    const empresaMetodoPagoUpdateForm = useForm<MetodoPagoUpdateDto>({
        resolver: valibotResolver(metodoPagoUpdateDto),
    });
    const empresaMetodoQrYapeUpdateQrForm = useForm<MetodoPagoUpdateDto>({
        resolver: valibotResolver(metodoQrYapeUpdateQrDto),
    });
    const empresaMetodoQrPlinUpdateQrForm = useForm<MetodoPagoUpdateDto>({
        resolver: valibotResolver(metodoQrPlinUpdateQrDto),
    });

    function onEmpresaMetodoPagoUpdateSubmit(body: MetodoPagoUpdateDto) {
        console.log(body);
    }
    function onEmpresaMetodoQrYapeUpdateQrSubmit(body: MetodoPagoUpdateDto) {
        console.log(body);
    }
    function onEmpresaMetodoQrPlinUpdateQrSubmit(body: MetodoPagoUpdateDto) {
        console.log(body);
    }

    const stripeEnabled = empresaMetodoPagoUpdateForm.watch("stripe.enabled");
    const izipayEnabled = empresaMetodoPagoUpdateForm.watch("izipay.enabled");
    const mercadoPagoEnabled = empresaMetodoPagoUpdateForm.watch(
        "mercado_pago.enabled"
    );
    const niubizEnabled = empresaMetodoPagoUpdateForm.watch("niubiz.enabled");
    const transferenciasEnabled = empresaMetodoPagoUpdateForm.watch(
        "transferencias_enabled"
    );
    const paypalEnabled = empresaMetodoPagoUpdateForm.watch("paypal.enabled");
    const qrPlinEnabled = empresaMetodoPagoUpdateForm.watch("qr_plin_enabled");
    const qrYapeEnabled = empresaMetodoPagoUpdateForm.watch("qr_yape_enabled");

    return (
        <Form
            {...empresaMetodoPagoUpdateForm}
            onSubmit={onEmpresaMetodoPagoUpdateSubmit}
            className={`${animationFadeInUpTailwind} ${
                configuracion_metodo_pago_tab !== "metodos-pago" ? "hidden" : ""
            }  grid  gap-4`}
        >
            {/* Efectivo */}
            <div class="flex gap-4 items-center bg-background p-4  border border-border rounded-2xl">
                <div class="min-w-[50px] min-h-[50px] rounded-full border border-border bg-white flex justify-center items-center self-start">
                    <HandHoldingBoxIconLight {...sizeIcon.large} />
                </div>
                <div class="flex flex-col w-full gap-2">
                    <div class="flex gap-4 justify-between w-full">
                        <div class="">
                            <h4 class="font-semibold">Efectivo</h4>
                            <p class="text-muted-foreground text-sm">
                                Pago en efectivo
                            </p>
                        </div>
                        <div class="w-[80px]">
                            <Form.control.toggle<MetodoPagoUpdateDto>
                                name="enabled_efectivo"
                                title=""
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* Transferencias */}
            <div class="flex flex-col sm:flex-row gap-4 items-center bg-background p-4  border border-border rounded-2xl">
                <div class="min-w-[50px] min-h-[50px] rounded-full border border-border bg-white flex justify-center items-center self-start">
                    <MoneyCheckIconLight {...sizeIcon.large} />
                </div>
                <div class="flex flex-col w-full gap-2">
                    <div class="flex gap-4 justify-between w-full">
                        <div class="">
                            <h4 class="font-semibold">
                                Transferencias bancarias
                            </h4>
                            <p class="text-muted-foreground text-sm">
                                Pago por transferencia bancaria
                            </p>
                        </div>
                        <div class="w-[80px]">
                            <Form.control.toggle<MetodoPagoUpdateDto>
                                name="transferencias_enabled"
                                title=""
                            />
                        </div>
                    </div>
                    <div class={cn(!transferenciasEnabled && "hidden")}>
                        {empresaStore.empresa!.payment.bancos.map((bank) => {
                            const money = empresaStore.empresa!.payment.money;
                            const banco = countries
                                .find(
                                    (country) =>
                                        country.dial_code ===
                                        empresaStore.empresa!.dial_code
                                )!
                                .bancos.find((banco) => banco.key === bank)!;
                            return (
                                <Fragment key={bank}>
                                    <div class="flex flex-col my-2 w-full">
                                        <div class="flex justify-between gap-4 items-center w-full">
                                            <span class="font-semibold text-foreground mb-2 text-md flex gap-2">
                                                {banco?.value}
                                            </span>
                                            <div class="w-[80px]">
                                                <Form.control.toggle<MetodoPagoUpdateDto>
                                                    name={`transferencias.${bank}.enabled`}
                                                    title=""
                                                />
                                            </div>
                                        </div>
                                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                                            <Form.control
                                                ico={<UserIconLight />}
                                                title="Titular"
                                                name={`transferencias.${bank}.titular`}
                                            />
                                            <Form.control<MetodoPagoUpdateDto>
                                                title={`Cuenta en ${money.money}`}
                                                ico={
                                                    <span>
                                                        {formatMoney(0)[0]}
                                                    </span>
                                                }
                                                name={`transferencias.${bank}.${money.simbolo}`}
                                            />
                                            <Form.control<MetodoPagoUpdateDto>
                                                title="Cuenta en Dolares"
                                                name={`transferencias.${bank}.dolares`}
                                                ico={<span>$</span>}
                                            />
                                        </div>
                                        <Hr className="hidden! md:block! mt-4!" />
                                    </div>
                                </Fragment>
                            );
                        })}
                    </div>
                </div>
            </div>
            {/* Stripe */}
            <div class="flex flex-col sm:flex-row gap-4 items-center bg-background p-4  border border-border rounded-2xl">
                <div class="min-w-[50px] min-h-[50px] rounded-full border border-border bg-[#645BFF]/10 flex justify-center items-center self-start">
                    <Image
                        src="/settings/images/payments/stripe.webp"
                        alt="facebook pixel"
                        title="facebook_pixel"
                        size="xs"
                    />
                </div>
                <div class="flex flex-col w-full gap-2">
                    <div class="flex gap-4 justify-between w-full">
                        <div class="">
                            <h4 class="font-bold">Stripe</h4>
                            <p class="text-muted-foreground text-sm">
                                Accept credit cards and digital wallets
                            </p>
                        </div>
                        <div class="w-[80px]">
                            <Form.control.toggle<MetodoPagoUpdateDto>
                                name="stripe.enabled"
                                title=""
                            />
                        </div>
                    </div>
                    <div
                        class={cn(
                            "grid sm:grid-cols-2 gap-6",
                            !stripeEnabled && "hidden"
                        )}
                    >
                        <Form.control<MetodoPagoUpdateDto>
                            name="stripe.client_secret"
                            title="Cliente secret"
                            placeholder=""
                            className={cn("bg-transparent!  ring-0!  p-2!")}
                        />
                        <Form.control<MetodoPagoUpdateDto>
                            type="password"
                            name="stripe.secret_key"
                            title="Secret key"
                            placeholder=""
                            className={cn("bg-transparent!  ring-0!  p-2!")}
                        />
                    </div>
                </div>
            </div>
            {/* Izipay */}
            <div class="flex flex-col sm:flex-row gap-4 items-center bg-background p-4  border border-border rounded-2xl">
                <div class="min-w-[50px] min-h-[50px] rounded-full border border-border bg-[#01A1A4]/20 flex justify-center items-center self-start">
                    <Image
                        src="/settings/images/payments/izipay.webp"
                        alt="izipay"
                        title="izipay"
                        size="sm"
                    />
                </div>
                <div class="flex flex-col w-full gap-2">
                    <div class="flex gap-4 justify-between w-full">
                        <div class="">
                            <h4 class="font-semibold">Izipay</h4>
                            <p class="text-muted-foreground text-sm">
                                Accept credit cards and digital wallets
                            </p>
                        </div>
                        <div class="w-[80px]">
                            <Form.control.toggle<MetodoPagoUpdateDto>
                                name="izipay.enabled"
                                title=""
                            />
                        </div>
                    </div>
                    <div
                        class={cn(
                            "grid sm:grid-cols-2 gap-6",
                            !izipayEnabled && "hidden"
                        )}
                    >
                        <Form.control<MetodoPagoUpdateDto>
                            name="izipay.public_key"
                            title="Public key"
                            placeholder=""
                            className={cn("bg-transparent!  ring-0!  p-2!")}
                        />
                        <Form.control<MetodoPagoUpdateDto>
                            name="izipay.hash_key"
                            title="Hash key"
                            placeholder=""
                            className={cn("bg-transparent!  ring-0!  p-2!")}
                        />
                        <Form.control<MetodoPagoUpdateDto>
                            name="izipay.client_secret"
                            title="Cliente secret"
                            placeholder=""
                            className={cn("bg-transparent!  ring-0!  p-2!")}
                        />
                        <Form.control<MetodoPagoUpdateDto>
                            type="password"
                            name="izipay.client_secret"
                            title="Secret key"
                            placeholder=""
                            className={cn("bg-transparent!  ring-0!  p-2!")}
                        />
                    </div>
                </div>
            </div>
            {/* Niubiz */}
            <div class="flex flex-col sm:flex-row gap-4 items-center bg-background p-4  border border-border rounded-2xl">
                <div class="min-w-[50px] min-h-[50px] rounded-full border border-border bg-[#06A9F3]/20 flex justify-center items-center self-start">
                    <Image
                        src={
                            themeContext.state === "dark"
                                ? "/settings/images/payments/niubiz-white.webp"
                                : "/settings/images/payments/niubiz-black.webp"
                        }
                        alt="niubiz"
                        title="izipay"
                        size="sm"
                    />
                </div>
                <div class="flex flex-col w-full gap-2">
                    <div class="flex gap-4 justify-between w-full">
                        <div class="">
                            <h4 class="font-semibold">Niubiz</h4>
                            <p class="text-muted-foreground text-sm">
                                Accept credit cards and digital wallets
                            </p>
                        </div>
                        <div class="w-[80px]">
                            <Form.control.toggle<MetodoPagoUpdateDto>
                                name="niubiz.enabled"
                                title=""
                            />
                        </div>
                    </div>
                    <div
                        class={cn(
                            "grid sm:grid-cols-2 gap-6",
                            !niubizEnabled && "hidden"
                        )}
                    >
                        <Form.control<MetodoPagoUpdateDto>
                            name="niubiz.merchant_id"
                            title="Merchant ID"
                            placeholder=""
                            className={cn("bg-transparent!  ring-0!  p-2!")}
                        />
                        <Form.control<MetodoPagoUpdateDto>
                            name="niubiz.user"
                            title="Usuario"
                            placeholder=""
                            className={cn("bg-transparent!  ring-0!  p-2!")}
                        />
                        <Form.control<MetodoPagoUpdateDto>
                            name="niubiz.password"
                            title="Contraseña"
                            placeholder=""
                            type="password"
                            className={cn("bg-transparent!  ring-0!  p-2!")}
                        />
                    </div>
                </div>
            </div>
            {/* Mercado pago */}
            <div class="flex flex-col sm:flex-row gap-4 items-center bg-background p-4  border border-border rounded-2xl">
                <div class="min-w-[50px] min-h-[50px] rounded-full border border-border bg-[#2ABDFF]/20 flex justify-center items-center self-start">
                    <Image
                        src="/settings/images/payments/mercado-pago.webp"
                        alt="mercado-pago"
                        title="mercado-pago"
                        size="xs"
                    />
                </div>
                <div class="flex flex-col w-full gap-2">
                    <div class="flex gap-4 justify-between w-full">
                        <div class="">
                            <h4 class="font-semibold">Mercado Pago</h4>
                            <p class="text-muted-foreground text-sm">
                                Accept credit cards and digital wallets
                            </p>
                        </div>
                        <div class="w-[80px]">
                            <Form.control.toggle<MetodoPagoUpdateDto>
                                name="mercado_pago.enabled"
                                title=""
                            />
                        </div>
                    </div>
                    <div class={cn(!mercadoPagoEnabled && "hidden")}>
                        <Form.control<MetodoPagoUpdateDto>
                            name="mercado_pago.token"
                            title="Token"
                            placeholder=""
                            className={cn("bg-transparent!  ring-0!  p-2!")}
                        />
                    </div>
                </div>
            </div>
            {/* Paypal */}
            <div class="flex flex-col sm:flex-row gap-4 items-center bg-background p-4  border border-border rounded-2xl">
                <div class="min-w-[50px] min-h-[50px] rounded-full border border-border bg-[#24A6E1]/20 flex justify-center items-center self-start">
                    <Image
                        src="/settings/images/payments/paypal.webp"
                        alt="paypal"
                        title="mercado-pago"
                        size="xs"
                    />
                </div>
                <div class="flex flex-col w-full gap-2">
                    <div class="flex gap-4 justify-between w-full">
                        <div class="">
                            <h4 class="font-semibold">Paypal</h4>
                            <p class="text-muted-foreground text-sm">
                                Accept credit cards and digital wallets
                            </p>
                        </div>
                        <div class="w-[80px]">
                            <Form.control.toggle<MetodoPagoUpdateDto>
                                name="paypal.enabled"
                                title=""
                            />
                        </div>
                    </div>
                    <div
                        class={cn(
                            !paypalEnabled && "hidden",
                            "flex flex-col gap-4"
                        )}
                    >
                        <Form.control<MetodoPagoUpdateDto>
                            name="paypal.client_id"
                            title="Client ID"
                            placeholder=""
                            className={cn("bg-transparent!  ring-0!  p-2!")}
                        />
                        <Form.control<MetodoPagoUpdateDto>
                            name="paypal.secret_key"
                            title="Secret Key"
                            placeholder=""
                            className={cn("bg-transparent!  ring-0!  p-2!")}
                        />
                    </div>
                </div>
            </div>
            {/* Qr yape */}
            <div class="flex flex-col sm:flex-row gap-4 items-center bg-background p-4  border border-border rounded-2xl">
                <div class="min-w-[50px] min-h-[50px] rounded-full border border-border bg-[#7B328E]/20 flex justify-center items-center self-start">
                    <Image
                        src="/settings/images/payments/yape.webp"
                        alt="yape"
                        title="yape"
                        size="xs"
                    />
                </div>
                <div class="flex flex-col w-full gap-2">
                    <div class="flex gap-4 justify-between w-full">
                        <div class="">
                            <h4 class="font-semibold">Qr Yape</h4>
                            <p class="text-muted-foreground text-sm">
                                Accept credit cards and digital wallets
                            </p>
                        </div>
                        <div class="w-[80px]">
                            <Form.control.toggle<MetodoPagoUpdateDto>
                                name="qr_yape_enabled"
                                title=""
                            />
                        </div>
                    </div>
                    <div class={cn(!qrYapeEnabled && "hidden")}>
                        <Form
                            {...empresaMetodoQrYapeUpdateQrForm}
                            onSubmit={onEmpresaMetodoQrYapeUpdateQrSubmit}
                        >
                            <Form.control.file
                                name="qr_yape"
                                placeholder="Sube tu QR Yape"
                                accept={extensions.image.join(",")}
                                typesText={typeTextExtensions(extensions.image)}
                                title=""
                            />
                        </Form>
                    </div>
                </div>
            </div>
            {/* qr plin */}
            <div class="flex flex-col sm:flex-row gap-4 items-center bg-background p-4  border border-border rounded-2xl">
                <div class="min-w-[50px] min-h-[50px] rounded-full border border-border bg-[#15D9C9]/20 flex justify-center items-center self-start">
                    <Image
                        src="/settings/images/payments/plin.webp"
                        alt="plin"
                        title="plin"
                        size="xs"
                    />
                </div>
                <div class="flex flex-col w-full gap-2">
                    <div class="flex gap-4 justify-between w-full">
                        <div class="">
                            <h4 class="font-semibold">Qr Plin</h4>
                            <p class="text-muted-foreground text-sm">
                                Accept credit cards and digital wallets
                            </p>
                        </div>
                        <div class="w-[80px]">
                            <Form.control.toggle<MetodoPagoUpdateDto>
                                placeholder="Sube tu QR plin"
                                name="qr_plin_enabled"
                                title=""
                            />
                        </div>
                    </div>
                    <div class={cn(!qrPlinEnabled && "hidden")}>
                        <Form
                            {...empresaMetodoQrPlinUpdateQrForm}
                            onSubmit={onEmpresaMetodoQrPlinUpdateQrSubmit}
                        >
                            <Form.control.file name="qr_plin" title="" />
                        </Form>
                    </div>
                </div>
            </div>
        </Form>
    );
}

export default EmpresaMetodoPagoUpdate;
