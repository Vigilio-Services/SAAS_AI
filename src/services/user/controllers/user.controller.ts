import type { RequestVigilio } from "@config/server/const";
import { Pipe, Validator } from "@libs/server/custom.decorator";
import type { FiltersPaginator } from "@libs/server/helpers";
import type { UserAuth } from "@services/auth/dtos/auth.dto";
import { JWTAuth, OnlyBussiness } from "@services/auth/guards/auth.guard";
import {
    Body,
    Controller,
    Delete,
    Get,
    Injectable,
    Params,
    Post,
    Put,
    Query,
    Req,
    Status,
} from "@vigilio/express-core";
import { array, number, object, string } from "@vigilio/valibot";
import {
    type UserStoreDto,
    type UserUpdateDto,
    type UserUpdatePasswordDto,
    userStoreDto,
    userUpdateDto,
    userUpdatePasswordDto,
} from "../dtos/user.dto";
import { UserSchema } from "../schemas/user.schema";
import { UserService } from "../services/user.service";

@Injectable()
@Controller("/user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @OnlyBussiness()
    @JWTAuth()
    @Get("/")
    async index(
        @Req() req: RequestVigilio,
        @Query()
        query: FiltersPaginator<UserSchema>
    ) {
        const result = await this.userService.index(req.user, query);
        return result;
    }

    @OnlyBussiness()
    @JWTAuth(["user"])
    @Status(201)
    @Validator(userStoreDto)
    @Post("/")
    async store(@Req("user") user: UserAuth, @Body() body: UserStoreDto) {
        const result = await this.userService.store(user, body);
        return result;
    }

    @OnlyBussiness()
    @JWTAuth(["user"])
    @Pipe(object({ id: string() }))
    @Get("/:id")
    async show(@Params("id") id: string) {
        const result = await this.userService.show(id);
        return result;
    }

    @OnlyBussiness()
    @JWTAuth(["user"])
    @Status(201)
    @Pipe(object({ id: string() }))
    @Validator(userUpdateDto)
    @Put("/:id")
    async update(
        @Req("user") user: UserAuth,
        @Params("id") id: string,
        @Body() body: UserUpdateDto
    ) {
        const result = await this.userService.update(user, id, body);
        return result;
    }

    @OnlyBussiness()
    @JWTAuth(["user"])
    @Pipe(object({ id: string() }))
    @Validator(userUpdatePasswordDto)
    @Put("/:id/update-password")
    async updatePassword(
        @Params("id") id: string,
        @Body() body: UserUpdatePasswordDto
    ) {
        const result = await this.userService.updatePassword(id, body);
        return result;
    }

    @JWTAuth(["user"])
    @Pipe(object({ id: string() }))
    @Delete("/:id")
    async destroy(@Params("id") id: string) {
        const result = await this.userService.destroy(id);
        return result;
    }

    @OnlyBussiness()
    @Validator(object({ ids: array(number()) }))
    @JWTAuth(["user"])
    @Delete("/")
    async destroyUsers(@Body() body: { ids: number[] }) {
        const result = await this.userService.destroyUsers(body.ids);
        return result;
    }
}
