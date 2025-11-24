import { FiltersPaginator, paginator } from "@libs/server/helpers";
import { UserAuth } from "@services/auth/dtos/auth.dto";
import { removeFile } from "@services/uploads/libs/server/uploads.libs";
import { Injectable, NotFoundException } from "@vigilio/express-core";
import cache from "@vigilio/express-core/cache";
import { Op, WhereOptions } from "sequelize";
import { FileStoreDto } from "../dtos/file.dto";
import { FileEntity } from "../entitites/file.entity";
import { EmpresaSchemaFromServer } from "../schemas/empresa.schema";
import { FileSchema } from "../schemas/file.schema";

@Injectable()
export class FileService {
    async index(
        empresa: EmpresaSchemaFromServer,
        filters: FiltersPaginator<FileSchema>
    ) {
        const result = await paginator("file", {
            filters,
            cb: async (props) => {
                const { offset, limit, filters, search } = props;
                let where: WhereOptions = {
                    empresa_id: empresa.id,
                    name: {
                        [Op.iLike]: `%${search || ""}%`,
                    },
                };

                if (filters?.created_at) {
                    where = {
                        ...where,
                        created_at: {
                            [Op.gte]: filters.created_at.from,
                            [Op.lte]: filters.created_at.to,
                        },
                    };
                }

                const result = await Promise.all([
                    FileEntity.findAll({
                        offset,
                        limit,
                        order: [["id", "ASC"]],
                        where,
                    }),
                    FileEntity.count({
                        where,
                    }),
                ]);
                return result;
            },
        });
        return result;
    }
    async store(
        empresa: EmpresaSchemaFromServer,
        user: UserAuth,
        body: FileStoreDto
    ) {
        const file = new FileEntity({
            ...body,
            user_id: user.id,
            empresa_id: empresa.id,
            history: [],
        });
        await file.save();
        cache.delete("files");
        return {
            success: true,
            file,
        };
    }
    async show(empresa: EmpresaSchemaFromServer, id: string) {
        const file = await FileEntity.findOne({
            where: {
                empresa_id: empresa.id,
                id,
            },
        });
        if (!file) {
            throw new NotFoundException(
                `No se encontró un archivo con el id ${id}`
            );
        }
        return {
            success: true,
            file,
        };
    }
    async destroy(empresa: EmpresaSchemaFromServer, id: string) {
        const { file } = await this.show(empresa, id);
        if (file.file) {
            await removeFile(file.file);
        }
        if (file.history.length) {
            for (const element of file.history) {
                await removeFile([{ name: element, file: element, size: 0 }]);
            }
        }
        await file.destroy();
        cache.delete("files");
        return {
            success: true,
            message: "Eliminado Correctamente.",
        };
    }
}
