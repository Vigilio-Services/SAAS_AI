import { Pipe, Validator } from "@libs/server/custom.decorator";
import type { UserAuth } from "@services/auth/dtos/auth.dto";
import { JWTAuth, OnlyBussiness } from "@services/auth/guards/auth.guard";
import {
    Body,
    Controller,
    Get,
    Injectable,
    Params,
    Put,
    Req,
    Status,
} from "@vigilio/express-core";
import { object, string } from "@vigilio/valibot";
import { type CompanyUpdateDto, companyUpdateDto } from "../dtos/company.dto";
import { type EmpresaUpdateDto, empresaUpdateDto } from "../dtos/empresa.dto";
import {
    type MetodoPagoUpdateDto,
    metodoPagoUpdateDto,
} from "../dtos/metodo_pago.dto";
import type { EmpresaSchemaFromServer } from "../schemas/empresa.schema";
import { EmpresaService } from "../services/empresa.service";

@Injectable()
@Controller("/empresa")
export class EmpresaController {
    constructor(private readonly empresaService: EmpresaService) {}

    @Validator(empresaUpdateDto)
    @JWTAuth(["empresa_update"])
    @Put("/")
    async update(
        @Req("user") user: UserAuth,
        @Req("empresa") empresa: EmpresaSchemaFromServer,
        @Body() body: EmpresaUpdateDto
    ) {
        const result = await this.empresaService.update(user, empresa, body);
        return result;
    }

    @Validator(companyUpdateDto)
    @OnlyBussiness()
    @JWTAuth(["empresa_company"])
    @Status(201)
    @Pipe(object({ id: string() }))
    @Put("/:id")
    async updateCompany(
        @Params("id") id: string,
        @Body() body: CompanyUpdateDto
    ) {
        const result = await this.empresaService.updateCompany(id, body);
        return result;
    }

    // METODO PAGO
    @Validator(metodoPagoUpdateDto)
    @OnlyBussiness()
    @JWTAuth(["empresa_payment"])
    @Get("/metodo-pago")
    async metodoPago(@Req("empresa") empresa: EmpresaSchemaFromServer) {
        const result = await this.empresaService.metodoPago(empresa);
        return result;
    }

    @Validator(metodoPagoUpdateDto)
    @OnlyBussiness()
    @JWTAuth(["empresa_payment"])
    @Put("/metodo-pago")
    async updateMetodoPago(
        @Req("empresa") empresa: EmpresaSchemaFromServer,
        @Body() body: MetodoPagoUpdateDto
    ) {
        const result = await this.empresaService.updateMetodoPago(
            empresa,
            body
        );
        return result;
    }
}
