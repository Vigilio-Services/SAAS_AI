import {
    ResultApiImages,
    ResultApiImagesError,
    uploadApi,
} from "@libs/client/helpers";
import { useMutation } from "@vigilio/preact-fetching";
import {
    CertificadoDigitalUpdateDto,
    CompanyUpdateDto,
    LogoFacturacionUpdateDto,
} from "../dtos/company.dto";

const certificadoDigitalFile = "/uploads/company/certificado_digital";
const logoFacturacionUpdateFile = "/uploads/company/logo_facturacion";
/**
 * update - /api/company/:id
 * @method PUT
 */
export function companyUpdateApi(id: number) {
    return useMutation<
        CompanyUpdateApiResult,
        CompanyUpdateDto,
        CompanyUpdateApiError
    >(`/company/${id}`, async (url, body) => {
        const response = await fetch(`/api${url}`, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await response.json();
        if (!response.ok) {
            throw result;
        }
        return result;
    });
}
interface CompanyUpdateApiResult {
    success: true;
    message: string;
}
interface CompanyUpdateApiError {
    success: false;
    message: string;
    body: keyof CompanyUpdateDto;
}

/**
 * update - /api/uploads/company/certificado_digital/:id | PUT
 * @method PUT
 */
export function certificadoDigitalCompanyUpdateApi(id: number) {
    return useMutation<
        ResultApiImages,
        CertificadoDigitalUpdateDto,
        ResultApiImagesError<CertificadoDigitalUpdateDto>
    >(`/${certificadoDigitalFile}/${id}`, async (url, body) => {
        const result = await uploadApi(`/api${url}`, {
            file: body.certificado_digital,
        });
        return result;
    });
}
/**
 * update - /api/uploads/company/certificado_digital/:id | PUT
 * @method PUT
 */
export function logoFacturacionCompanyUpdateApi(id: number) {
    return useMutation<
        ResultApiImages,
        LogoFacturacionUpdateDto,
        ResultApiImagesError<LogoFacturacionUpdateDto>
    >(`/${logoFacturacionUpdateFile}/${id}`, async (url, body) => {
        const result = await uploadApi(`/api${url}`, {
            file: body.logo_facturacion,
        });
        return result;
    });
}
