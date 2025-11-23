import type { RequestVigilio } from "@config/server/const";
import { Pipe, Validator } from "@libs/server/custom.decorator";
import type { FiltersPaginator } from "@libs/server/helpers";
import {
    Body,
    Controller,
    Delete,
    Get,
    Injectable,
    Params,
    Post,
    Query,
    Req,
    Status,
} from "@vigilio/express-core";
import { object, string } from "@vigilio/valibot";
import { type FileStoreDto, fileStoreDto } from "../dtos/file.dto";
import { FileSchema } from "../schemas/file.schema";
import { FileService } from "../services/file.service";

@Injectable()
@Controller("/file")
export class FileController {
    constructor(private readonly fileService: FileService) {}

    @Get("/")
    async index(@Query() filters: FiltersPaginator<FileSchema>) {
        const result = await this.fileService.index(filters);
        return result;
    }

    @Pipe(object({ id: string() }))
    @Get("/:id")
    async show(@Params("id") id: string) {
        const result = await this.fileService.show(id);
        return result;
    }

    @Validator(fileStoreDto)
    @Status(201)
    @Post("/")
    async store(@Req() req: RequestVigilio, @Body() body: FileStoreDto) {
        const result = await this.fileService.store(req.user, body);
        return result;
    }

    @Pipe(
        object({
            id: string(),
        })
    )
    @Delete("/:id")
    async destroy(@Params("id") id: string) {
        const result = await this.fileService.destroy(id);
        return result;
    }
}
