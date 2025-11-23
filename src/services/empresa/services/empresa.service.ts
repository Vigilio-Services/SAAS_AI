import { UserAuth } from "@services/auth/dtos/auth.dto";
import { BadRequestException, Injectable } from "@vigilio/express-core";
import cache from "@vigilio/express-core/cache";
import { CompanyUpdateDto } from "../dtos/company.dto";
import type { EmpresaUpdateDto } from "../dtos/empresa.dto";
import { MetodoPagoUpdateDto } from "../dtos/metodo_pago.dto";
import { CompanyEntity } from "../entitites/company.entity";
import { EmpresaEntity } from "../entitites/empresa.entity";
import { MetodoPagoEntity } from "../entitites/metodo_pago.entity";
import type { EmpresaSchemaFromServer } from "../schemas/empresa.schema";

@Injectable()
export class EmpresaService {
    async update(
        user: UserAuth,
        empresa: EmpresaSchemaFromServer,
        body: EmpresaUpdateDto
    ) {
        await EmpresaEntity.update(
            { ...body, user_id: user.id },
            {
                where: {
                    id: empresa.id,
                },
            }
        );
        await cache.delete("empresa");
        return {
            success: true,
            message: "Empresa actualizada correctamente",
        };
    }
    async updateCompany(id: string, body: CompanyUpdateDto) {
        await CompanyEntity.update(body, {
            where: { id },
        });
        cache.delete("empresa");
        return {
            success: true,
            message: "Companyo actualizado correctamente",
        };
    }

    async metodoPago(empresa: EmpresaSchemaFromServer) {
        const metodo = await MetodoPagoEntity.findOne({
            where: {
                empresa_id: empresa.id,
            },
        });

        if (!metodo)
            throw new BadRequestException("No se encontró metodo de pago");
        cache.delete(`EMPRESA:${empresa.slug}`);
        return {
            success: true,
            metodo,
        };
    }
    async updateMetodoPago(
        empresa: EmpresaSchemaFromServer,
        body: MetodoPagoUpdateDto
    ) {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        const data = Object.entries(body.transferencias as any).map((body) =>
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            Object.values((body as any)[1]).filter((val) => val)
        );

        // aca si  esta vacio entonces que sea null
        body.transferencias =
            data[0].length || data[1].length || data[2].length
                ? body.transferencias
                : null;
        await MetodoPagoEntity.update(body, {
            where: {
                empresa_id: empresa.id,
            },
        });
        cache.delete(`EMPRESA:${empresa.slug}`);
        return {
            success: true,
            message: "Metodo de pago actualizado correctamente",
        };
    }
}
