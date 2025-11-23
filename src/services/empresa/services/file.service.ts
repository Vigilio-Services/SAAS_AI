import { FiltersPaginator, paginator } from "@libs/server/helpers";
import { UserAuth } from "@services/auth/dtos/auth.dto";
import { removeFile } from "@services/uploads/libs/server/uploads.libs";
import { Injectable, NotFoundException } from "@vigilio/express-core";
import cache from "@vigilio/express-core/cache";
import { Op, WhereOptions } from "sequelize";
import { FileStoreDto } from "../dtos/file.dto";
import { FileEntity } from "../entitites/file.entity";
import { FileSchema } from "../schemas/file.schema";

@Injectable()
export class FileService {
    async index(filters: FiltersPaginator<FileSchema>) {
        const result = await paginator("file", {
            filters,
            cb: async (props) => {
                const { offset, limit, filters, search } = props;
                let where: WhereOptions = {
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
    async store(user: UserAuth, body: FileStoreDto) {
        const file = new FileEntity({ ...body, user_id: user.id, history: [] });
        await file.save();
        cache.delete("files");
        return {
            success: true,
            file,
        };
    }
    async show(id: string) {
        const file = await FileEntity.findByPk(id);
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
    async destroy(id: string) {
        const { file } = await this.show(id);
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
