import type { RequestVigilio } from "@config/server/const";
import { Pipe, Validator } from "@libs/server/custom.decorator";
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
import { EmpresaService } from "../services/empresa.service";

@Injectable()
@Controller("/empresa")
export class EmpresaController {
    constructor(private readonly empresaService: EmpresaService) {}

    @Validator(empresaUpdateDto)
    @JWTAuth(["empresa_update"])
    @Put("/")
    async update(@Req() req: RequestVigilio, @Body() body: EmpresaUpdateDto) {
        const result = await this.empresaService.update(
            req.empresa,
            req.user,
            body
        );
        return result;
    }

    @Validator(companyUpdateDto)
    @OnlyBussiness()
    @JWTAuth(["empresa_company"])
    @Status(201)
    @Pipe(object({ id: string() }))
    @Put("/:id")
    async updateCompany(
        @Req() req: RequestVigilio,
        @Params("id") id: string,
        @Body() body: CompanyUpdateDto
    ) {
        const result = await this.empresaService.updateCompany(
            req.empresa,
            req.user,
            id,
            body
        );
        return result;
    }

    // METODO PAGO
    @Validator(metodoPagoUpdateDto)
    @OnlyBussiness()
    @JWTAuth(["empresa_payment"])
    @Get("/metodo-pago")
    async metodoPago(@Req() req: RequestVigilio) {
        const result = await this.empresaService.metodoPago(req.empresa);
        return result;
    }

    @Validator(metodoPagoUpdateDto)
    @OnlyBussiness()
    @JWTAuth(["empresa_payment"])
    @Put("/metodo-pago")
    async updateMetodoPago(
        @Req() req: RequestVigilio,
        @Body() body: MetodoPagoUpdateDto
    ) {
        const result = await this.empresaService.updateMetodoPago(
            req.empresa,
            req.user,
            body
        );
        return result;
    }
}
