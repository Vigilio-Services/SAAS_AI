import type { RequestVigilio } from "@config/server/const";
import { Controller, Get, Injectable, Req } from "@vigilio/express-core";
import { SeederService } from "../services/seeder.service";

@Injectable()
@Controller("/seed")
export class SeederController {
    constructor(private readonly seederService: SeederService) {}

    @Get("/")
    async store(@Req() req: RequestVigilio) {
        const result = await this.seederService.store(req);
        return result;
    }
}
