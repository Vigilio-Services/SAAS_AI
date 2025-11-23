import type { RequestVigilio } from "@config/server/const";
import { Pipe, Validator } from "@libs/server/custom.decorator";
import { JWTAuth, OnlyBussiness } from "@services/auth/guards/auth.guard";
import {
    Body,
    Controller,
    Get,
    Injectable,
    Params,
    Post,
    Put,
    Req,
    Status,
} from "@vigilio/express-core";
import { object, string } from "@vigilio/valibot";
import {
    type AddressStoreDto,
    type AddressUpdateDto,
    addressStoreDto,
    addressUpdateDto,
} from "../dtos/address.dto";
import { AddressService } from "../services/address.service";

@Injectable()
@Controller("/address")
export class AddressController {
    constructor(private readonly addressService: AddressService) {}

    @Get("/")
    async index() {
        const result = await this.addressService.index();
        return result;
    }

    @Get("/:id")
    async show(@Params("id") id: string) {
        const result = await this.addressService.show(id);
        return result;
    }

    @Validator(addressStoreDto)
    @OnlyBussiness()
    @JWTAuth(["super-admin", "administracion"])
    @Status(201)
    @Post("/")
    async store(@Req() req: RequestVigilio, @Body() body: AddressStoreDto) {
        const result = await this.addressService.store(req.user, body);
        return result;
    }

    @Validator(addressUpdateDto)
    @OnlyBussiness()
    @JWTAuth(["super-admin", "administracion"])
    @Status(201)
    @Pipe(object({ id: string() }))
    @Put("/:id")
    async update(
        @Req() req: RequestVigilio,
        @Params("id") id: string,
        @Body() body: AddressUpdateDto
    ) {
        const result = await this.addressService.update(req.user, id, body);
        return result;
    }
}
