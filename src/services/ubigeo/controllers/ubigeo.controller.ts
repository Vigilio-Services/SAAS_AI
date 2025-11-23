import { Controller, Get, Injectable } from "@vigilio/express-core";
import { UbigeoService } from "../services/ubigeo.service";

@Injectable()
@Controller("/ubigeo")
export class UbigeoController {
    constructor(private readonly ubigeoService: UbigeoService) {}

    @Get("/")
    async index() {
        const result = await this.ubigeoService.index();
        return result;
    }
}
