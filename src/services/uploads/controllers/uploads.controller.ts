import { Pipe } from "@libs/server/custom.decorator";
import { JWTAuth, JWTAuthUpload } from "@services/auth/guards/auth.guard";
import {
    Controller,
    Injectable,
    Params,
    Post,
    Req,
    Upload,
} from "@vigilio/express-core";
import type { Request } from "express";
import { File } from "formidable";
import type {
    UploadsEntities,
    UploadsProperties,
} from "../libs/server/uploads.libs";
import { uploadsStorePipe, uploadsUpdatePipe } from "../pipes/uploads.pipe";
import { UploadsService } from "../services/upload.service";
@Injectable()
@Controller("/uploads")
export class UploadsController {
    constructor(private readonly uploadsService: UploadsService) {}

    @JWTAuthUpload([])
    @Pipe(uploadsStorePipe)
    @Upload()
    @Post("/:entity/:property")
    async store(
        @Params("entity")
        entity: UploadsEntities,
        @Params("property") property: UploadsProperties,
        @Req() req: Request & { files: File[]; filesName?: string }
    ) {
        const result = await this.uploadsService.store({
            req,
            property,
            entity,
        });
        return result;
    }

    @JWTAuth()
    @Pipe(uploadsUpdatePipe)
    @Upload()
    @Post("/:entity/:property/:id")
    async update(
        @Params("entity") entity: UploadsEntities,
        @Params("id") id: string,
        @Params("property") property: UploadsProperties,
        @Req() req: Request & { files: File[]; filesName?: string }
    ) {
        const result = await this.uploadsService.update({
            req,
            id,
            property,
            entity,
        });
        return result;
    }
}
