import Button from "@components/extras/button";
import Card from "@components/extras/card";
import Modal from "@components/extras/modal";
import Form from "@components/form";
import { useEmpresaContext } from "@contexts/empresa.context";
import { getFilesEdit, handlerError, sizeIcon } from "@libs/client/helpers";
import { useSignal } from "@preact/signals";
import { extensions, typeTextExtensions } from "@services/uploads/libs/client";
import {
    BuildingIconSolid,
    KeyIconSolid,
    MapPinIconSolid,
    PhoneIconSolid,
    RobotIconSolid,
    SunCloudIconSolid,
} from "@vigilio/react-icons";
import { sweetModal } from "@vigilio/sweet";
import { valibotResolver } from "@vigilio/valibot/resolver";
import { useMemo } from "preact/hooks";
import { useForm } from "react-hook-form";
import { addressIndexApi } from "../apis/address.api";
import {
    certificadoDigitalCompanyUpdateApi,
    companyUpdateApi,
    logoFacturacionCompanyUpdateApi,
} from "../apis/company.api";
import { empresaUpdateApi } from "../apis/empresa.api";
import {
    CertificadoDigitalUpdateDto,
    CompanyUpdateDto,
    certificadoDigitalUpdateDto,
    companyUpdateDto,
    LogoFacturacionUpdateDto,
    logoFacturacionUpdateDto,
} from "../dtos/company.dto";
import { type EmpresaUpdateDto, empresaUpdateDto } from "../dtos/empresa.dto";
import { AddressIndex } from "./address.components";

export function EmpresaUpdate() {
    const empresaContext = useEmpresaContext();
    const addressIndexQuery = addressIndexApi();

    const empresaUpdateMutation = empresaUpdateApi();
    const companyUpdateMutation = companyUpdateApi(
        empresaContext.empresa.company.id
    );
    const logoFacturacionCompanyUpdateMutation =
        logoFacturacionCompanyUpdateApi(empresaContext.empresa.company.id);
    const certificadoDigitalCompanyUpdateMutation =
        certificadoDigitalCompanyUpdateApi(empresaContext.empresa.company.id);

    const openChooseCampaña = useSignal<boolean>(false);
    const openChooseAddress = useSignal<boolean>(false);

    const empresaUpdateForm = useForm<EmpresaUpdateDto>({
        defaultValues: empresaContext.empresa,
        resolver: valibotResolver(empresaUpdateDto),
    });
    const companyUpdateForm = useForm<CompanyUpdateDto>({
        defaultValues: empresaContext.empresa.company,
        resolver: valibotResolver(companyUpdateDto),
    });
    const logoFacturacionCompanyUpdateForm = useForm<LogoFacturacionUpdateDto>({
        defaultValues: async () => {
            const logo_facturacion = await getFilesEdit(
                empresaContext.empresa.company.logo_facturacion,
                300
            );
            return { logo_facturacion };
        },
        resolver: valibotResolver(logoFacturacionUpdateDto),
    });
    const certificadoDigitalUpdateForm = useForm<CertificadoDigitalUpdateDto>({
        defaultValues: async () => {
            const certificado_digital = await getFilesEdit(
                empresaContext.empresa.company.certificado_digital,
                null
            );
            return { certificado_digital };
        },
        resolver: valibotResolver(certificadoDigitalUpdateDto),
    });
    // actualizar empresa
    function onEmpresaUpdate(data: EmpresaUpdateDto) {
        sweetModal({
            title: "¿Estás seguro de querer actualizar la empresa?",
            icon: "warning",
        }).then(({ isConfirmed }) => {
            if (isConfirmed) {
                empresaUpdateMutation.mutate(data, {
                    onSuccess() {
                        sweetModal({
                            title: "Empresa actualizado correctamente",
                            icon: "success",
                            showCancelButton: false,
                        });
                    },
                    onError(err) {
                        handlerError(
                            empresaUpdateForm,
                            err,
                            "No se pudo actualizar la empresa"
                        );
                    },
                });
            }
        });
    }
    // actualizar company
    function onCompanyUpdate(data: CompanyUpdateDto) {
        sweetModal({
            title: "¿Estás seguro de querer compañia de la empresa?",
            icon: "warning",
        }).then(({ isConfirmed }) => {
            if (isConfirmed) {
                companyUpdateMutation.mutate(data, {
                    onSuccess() {
                        sweetModal({
                            title: "Compañía actualizado correctamente",
                            icon: "success",
                            showCancelButton: false,
                        });
                    },
                    onError(err) {
                        handlerError(
                            companyUpdateForm,
                            err,
                            "No se pudo actualizar la compañía"
                        );
                    },
                });
            }
        });
    }

    // obtener address
    const ubigeoAddress = useMemo(() => {
        if (addressIndexQuery.isSuccess) {
            return addressIndexQuery.data!.data.map((address) => ({
                key: address.id,
                value: `${address.direccion} - ${address.city.name} - ${address.city.region.name} - ${address.city.region.country.name}`,
            }));
        }
        return [];
    }, [addressIndexQuery.isSuccess]);
    function onLogoFacturacionCompanyUpdate(data: LogoFacturacionUpdateDto) {
        sweetModal({
            title: "¿Estás seguro de querer actualizar el logo de facturación electrónica?",
            icon: "warning",
        }).then(({ isConfirmed }) => {
            if (isConfirmed) {
                logoFacturacionCompanyUpdateMutation.mutate(data, {
                    onSuccess() {
                        sweetModal({
                            title: "Logo de facturación actualizado correctamente",
                            icon: "success",
                            showCancelButton: false,
                        });
                    },
                    onError(err) {
                        handlerError(
                            logoFacturacionCompanyUpdateForm,
                            err,
                            "No se pudo actualizar la facturación actualizado "
                        );
                    },
                });
            }
        });
    }
    function onCertificadoDigitalUpdateUpdate(
        data: CertificadoDigitalUpdateDto
    ) {
        sweetModal({
            title: "¿Estás seguro de querer actualizar el certificado digital?",
            icon: "warning",
        }).then(({ isConfirmed }) => {
            if (isConfirmed) {
                certificadoDigitalCompanyUpdateMutation.mutate(data, {
                    onSuccess() {
                        sweetModal({
                            title: "Certificado digital actualizado correctamente",
                            icon: "success",
                            showCancelButton: false,
                        });
                    },
                    onError(err) {
                        handlerError(
                            certificadoDigitalUpdateForm,
                            err,
                            "No se pudo actualizar certificado digital."
                        );
                    },
                });
            }
        });
    }
    return (
        <>
            <Card className="p-4">
                <Card.content>
                    <div>
                        <div class="gap-2 flex items-center">
                            <Button
                                type="button"
                                onClick={() => {
                                    openChooseAddress.value = true;
                                }}
                                className="flex items-center gap-2  "
                                variant="primary"
                            >
                                <MapPinIconSolid {...sizeIcon.medium} />
                                Direcciones
                            </Button>
                            <Button
                                type="button"
                                onClick={() => {
                                    openChooseCampaña.value = true;
                                }}
                                className="flex items-center gap-2 !bg-yellow-600 hover:!bg-yellow-700 hover:fill-white hover:text-white !text-white fill-white"
                                variant="outline"
                            >
                                <SunCloudIconSolid {...sizeIcon.medium} />
                                Campañas
                            </Button>
                        </div>
                    </div>
                    <div class="grid md:grid-cols-2 gap-4">
                        <div class="flex flex-col gap-4">
                            {/* empresa update */}
                            <Form
                                className="w-full py-4 max-w-[500px] flex flex-col justify-center gap-4 items-center lg:justify-start"
                                onSubmit={onEmpresaUpdate}
                                {...empresaUpdateForm}
                            >
                                <Form.control<EmpresaUpdateDto>
                                    name={"name_empresa"}
                                    title="Nombre de la empresa"
                                    type="text"
                                    ico={<BuildingIconSolid />}
                                />
                                <Form.control.color<EmpresaUpdateDto>
                                    name={"color_primary"}
                                    title="Color Primario"
                                />
                                <Form.control.select<EmpresaUpdateDto>
                                    name={"address_id"}
                                    title="Dirección"
                                    placeholder="Digite dirección"
                                    array={ubigeoAddress}
                                />
                                <div class="grid md:grid-cols-3 gap-2 self-start">
                                    <Form.control.toggle<EmpresaUpdateDto>
                                        name={"enabled_automatic_payment"}
                                        title="Habilitar pago automatico"
                                    />
                                    <Form.control.toggle<EmpresaUpdateDto>
                                        name={"enabled_send_sunat"}
                                        title="Habilitar emitir facturación electrónica"
                                        question="Cuando esto este habilitado se emitirá los comprobantes de pago a sunat automaticamente."
                                    />
                                    <Form.control.toggle<EmpresaUpdateDto>
                                        name={"enabled_send_pdf"}
                                        title="Habilitar enviar pdf a email cliente"
                                        question="El cliente revisará un correo con el comprobante de pago realizado."
                                    />
                                </div>
                                <Form.control<EmpresaUpdateDto>
                                    name={"model_ai_groq"}
                                    title="Modelo de IA"
                                    placeholder="Selecciona un modelo"
                                    ico={<RobotIconSolid />}
                                />
                                <Form.control<EmpresaUpdateDto>
                                    name={"token_ai"}
                                    title="Token de IA"
                                    type="password"
                                    ico={<KeyIconSolid />}
                                />
                                <Form.control<EmpresaUpdateDto>
                                    name={"telefono"}
                                    title="Teléfono"
                                    type="tel"
                                    ico={<PhoneIconSolid />}
                                />
                                <Form.button.submit
                                    isLoading={
                                        empresaUpdateMutation.isLoading || false
                                    }
                                    disabled={
                                        empresaUpdateMutation.isLoading || false
                                    }
                                    title="Actualizar"
                                    loading_title="Actualizando"
                                />
                            </Form>
                            {/*  compania update */}
                            <Form
                                onSubmit={onCompanyUpdate}
                                {...companyUpdateForm}
                            >
                                <div className="grid md:grid-cols-2 gap-4">
                                    <Form.control<CompanyUpdateDto>
                                        name={"nombre_comercial"}
                                        title="Nombre comercial de la empresa"
                                    />
                                    <Form.control<CompanyUpdateDto>
                                        name={"razon_social"}
                                        title="Razón social"
                                    />
                                    <Form.control<CompanyUpdateDto>
                                        name={"ruc"}
                                        title="Ruc"
                                    />
                                    <Form.control<CompanyUpdateDto>
                                        name={"sol_user"}
                                        title="Usuario SOL"
                                    />
                                    <Form.control<CompanyUpdateDto>
                                        name={"sol_pass"}
                                        title="Contraseña SOL"
                                    />
                                    <Form.control<CompanyUpdateDto>
                                        name={"client_id"}
                                        title="Cliente ID - Guía de remisión"
                                    />
                                    <Form.control<CompanyUpdateDto>
                                        name={"certificado_password"}
                                        title="Cliente Contraseña - Guía de remisión"
                                    />
                                    <Form.control.select<CompanyUpdateDto>
                                        name={"mode"}
                                        array={[
                                            {
                                                key: "production",
                                                value: "Producción",
                                            },
                                            {
                                                key: "development",
                                                value: "Desarrollo",
                                            },
                                        ]}
                                        title="Modo"
                                        placeholder="Escoger el tipo de desarrollo"
                                    />
                                </div>
                                <Form.button.submit
                                    isLoading={
                                        companyUpdateMutation.isLoading || false
                                    }
                                    disabled={
                                        companyUpdateMutation.isLoading || false
                                    }
                                    loading_title="Actualizando..."
                                    title="Actualizar"
                                />
                            </Form>
                        </div>
                        <div class="flex flex-col gap-2">
                            {/* logo facturacion update */}
                            <Form
                                onSubmit={onLogoFacturacionCompanyUpdate}
                                {...logoFacturacionCompanyUpdateForm}
                            >
                                <Form.control.file<LogoFacturacionUpdateDto>
                                    title="Logo de facturación"
                                    name="logo_facturacion"
                                    typesText={typeTextExtensions([
                                        ...extensions.image,
                                    ])}
                                    accept={extensions.image.join(", ")}
                                />
                                <Form.button.submit
                                    title="Actualizar"
                                    disabled={
                                        logoFacturacionCompanyUpdateMutation.isLoading ||
                                        false
                                    }
                                    isLoading={
                                        logoFacturacionCompanyUpdateMutation.isLoading ||
                                        false
                                    }
                                    loading_title="Actualizando..."
                                />
                            </Form>
                            {/* certificado digital update */}
                            <Form
                                onSubmit={onCertificadoDigitalUpdateUpdate}
                                {...certificadoDigitalUpdateForm}
                            >
                                <Form.control.file<CertificadoDigitalUpdateDto>
                                    title="Certificado digital"
                                    name="certificado_digital"
                                />
                                <Form.button.submit
                                    title="Actualizar"
                                    disabled={
                                        certificadoDigitalCompanyUpdateMutation.isLoading ||
                                        false
                                    }
                                    isLoading={
                                        logoFacturacionCompanyUpdateMutation.isLoading ||
                                        false
                                    }
                                    loading_title="Actualizando..."
                                />
                            </Form>
                        </div>
                    </div>
                </Card.content>
                {/* campañas */}

                {/* direcciones */}
            </Card>
            {/* address index */}
            <Modal
                isOpen={openChooseAddress.value}
                onClose={() => {
                    openChooseAddress.value = false;
                }}
                contentClassName="max-w-[700px] w-full "
                content={
                    <div className="flex flex-col gap-4 font-bold text-2xl">
                        <span className="flex items-center gap-2">
                            <MapPinIconSolid
                                {...sizeIcon.large}
                                className=" fill-white"
                            />
                            Direcciones
                        </span>
                    </div>
                }
            >
                <AddressIndex />
            </Modal>
        </>
    );
}
