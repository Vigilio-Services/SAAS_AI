import { PaginatorResult, PaginatorResultError } from "@config/types/client";
import {
    FilterResult,
    ResultApiImages,
    ResultApiImagesError,
    uploadApi,
} from "@libs/client/helpers";
import { useMutation, useQuery } from "@vigilio/preact-fetching";
import { UsePaginator } from "@vigilio/preact-paginator";
import { FileStoreClientDto, FileUpdateClientDto } from "../dtos/file.dto";
import { FileSchema, FileSchemaFromServer } from "../schemas/file.schema";

/**
 * index - /api/file | GET
 * @method GET
 */
export function fileIndexApi(
    paginator: UsePaginator,
    filters: FilterResult<FileSchema> | null
) {
    return useQuery<
        PaginatorResult<FileSchemaFromServer>,
        PaginatorResultError
    >(
        "/file",
        async (url) => {
            const data = new URLSearchParams();
            data.append("offset", String(paginator.pagination.value.offset));
            data.append("limit", String(paginator.pagination.value.limit));
            if (filters) {
                if (filters.search?.debounce) {
                    data.append("search", filters.search.debounce);
                }
                if (Object.keys(filters.filters).length) {
                    data.append("filters", JSON.stringify(filters.filters));
                }
            }
            const response = await fetch(`/api${url}?${data}`);
            const result = await response.json();
            if (!response.ok) {
                throw result;
            }
            return result;
        },
        {
            onSuccess(data) {
                paginator.updateData({
                    total: data.count,
                });
            },
        }
    );
}

const fileUpdateFile = "/uploads/file/file";

/**
 * store - /api/file POST
 * @method POST
 */
export function fileStoreApi() {
    return useMutation<
        FileStoreApiResult,
        FileStoreClientDto,
        FileStoreApiError
    >("/file", async (url, body) => {
        const { files } = await uploadApi(`/api${fileUpdateFile}`, {
            file: body.file,
            name: body.name,
        });
        const response = await fetch(`/api${url}`, {
            method: "POST",
            body: JSON.stringify({ ...body, file: files }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await response.json();
        if (!response.ok) {
            throw result;
        }
        return result;
    });
}
interface FileStoreApiResult {
    success: true;
    file: FileSchema;
}
interface FileStoreApiError {
    success: false;
    message: string;
    body: keyof FileStoreClientDto;
}

/**
 * update - /api/file/:id | PUT
 * @method PUT
 */
export function fileUpdateFileApi(id: number) {
    return useMutation<
        ResultApiImages,
        FileUpdateClientDto,
        ResultApiImagesError<FileUpdateClientDto>
    >(`/${fileUpdateFile}/${id}`, async (url, body) => {
        const result = await uploadApi(`/api${url}`, {
            file: body.file,
            name: body.name,
        });
        return result;
    });
}

/**
 * show - /api/file/:id | GET
 * @method GET
 */
export function fileShowApi(id: string) {
    return useQuery<FileShowApiResult, FileShowApiError>(
        `/file/${id}`,
        async (url) => {
            const response = await fetch(`/api${url}`);
            const result = await response.json();
            if (!response.ok) {
                throw result;
            }
            return result;
        }
    );
}
interface FileShowApiResult {
    success: true;
    data: FileSchemaFromServer;
}
interface FileShowApiError {
    success: false;
    message: string;
}

/**
 * destroy - /api/file/:id | DELETE
 * @method DELETE
 */
export function fileDestroyApi() {
    return useMutation<FileDestroyApiResult, number, FileDestroyApiError>(
        "/file",
        async (url, id) => {
            const response = await fetch(`/api${url}/${id}`, {
                method: "DELETE",
            });
            const result = await response.json();
            if (!response.ok) {
                throw result;
            }
            return result;
        }
    );
}
interface FileDestroyApiResult {
    success: true;
    message: string;
}
interface FileDestroyApiError {
    success: false;
    message: string;
}
