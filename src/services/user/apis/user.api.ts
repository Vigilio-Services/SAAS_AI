import { PaginatorResult, PaginatorResultError } from "@config/types/client";
import {
    FilterResult,
    ResultApiImages,
    ResultApiImagesError,
    uploadApi,
} from "@libs/client/helpers";
import { memory, useMutation, useQuery } from "@vigilio/preact-fetching";
import { UsePaginator } from "@vigilio/preact-paginator";
import { UseTable } from "@vigilio/preact-table";
import {
    UserStoreClientDto,
    UserStoreDto,
    UserUpdateDto,
    UserUpdatePasswordDto,
    UserUpdatePhotoDto,
} from "../dtos/user.dto";
import { UserSchema, UserSchemaFromServer } from "../schemas/user.schema";

const userUrlPhoto = "/uploads/user/photo";
const userUrlWallpaper = "/uploads/user/wallpaper";
export const profesionalessUrlImage = "/uploads/users/photo";

export type UserIndexSecondaryPaginator = "action" | "index" | "information";
/**
 * index - /api/user?offset=0&limit=10
 * @method GET
 */
export type UserIndexTable = UseTable<
    UserSchemaFromServer,
    UserIndexSecondaryPaginator
>;
export function userIndexApi(
    table: UserIndexTable | null,
    paginator: UsePaginator | null,
    filters: FilterResult<UserSchemaFromServer> | null,
    addUsers?: (data: UserSchemaFromServer[]) => void
) {
    const query = useQuery<
        PaginatorResult<UserSchemaFromServer>,
        PaginatorResultError
    >(
        "/user",
        async (url) => {
            const data = new URLSearchParams();
            if (table) {
                data.append("offset", String(table.pagination.value.offset));
                data.append("limit", String(table.pagination.value.limit));

                if (table.search.debounceTerm.length) {
                    data.append("search", String(table.search.debounceTerm));
                }
                for (const [key, value] of Object.entries(table.sort.value)) {
                    data.append(key, value as string);
                }
                if (!Object.keys(table.sort.value).length) {
                    data.append("id", "DESC");
                }
            }
            if (paginator) {
                data.append(
                    "offset",
                    String(paginator.pagination.value.offset)
                );
                data.append("limit", String(paginator.pagination.value.limit));
                if (paginator.search.debounceTerm.length) {
                    data.append("search", paginator.search.debounceTerm);
                }
            }
            if (filters) {
                if (filters.search?.debounce?.length) {
                    data.append("search", filters.search.debounce);
                }
                if (Object.keys(filters.filters).length) {
                    data.append("filters", JSON.stringify(filters.filters));
                }
            }

            const urlChache = `/api${url}?${data}`;
            let result = memory.get(urlChache);
            if (!result) {
                const response = await fetch(urlChache);
                result = await response.json();
                if (!response.ok) {
                    throw result;
                }
                memory.set(urlChache, result, null, 3);
            }
            return result;
        },
        {
            onSuccess(data) {
                if (table) {
                    table.updateData({
                        result: data.results,
                        count: data.count,
                        methods: {
                            refetch: query.refetch,
                        },
                    });
                }
                if (paginator) {
                    if (addUsers) {
                        addUsers(data.results);
                    }
                    paginator.updateData({
                        total: data.count,
                    });
                }
            },
        }
    );
    return query;
}

export function userCursoRoleApi(
    paginator: UsePaginator,
    filters: FilterResult<{
        no_curso_id?: string;
        curso_id?: string;
        role?: UserSchema["role"];
    }>
) {
    const query = useQuery<
        PaginatorResult<UserSchemaFromServer>,
        PaginatorResultError
    >(
        "/user/user_curso_role",
        async (url) => {
            const data = new URLSearchParams();
            data.append("offset", String(paginator.pagination.value.offset));
            data.append("limit", String(paginator.pagination.value.limit));
            data.append("search", paginator.search.debounceTerm);
            if (Object.keys(filters.filters).length) {
                data.append("filters", JSON.stringify(filters.filters));
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
    return query;
}

/**
 * store - /api/user
 * @method POST
 */
export function userStoreApi() {
    return useMutation<
        UserStoreApiResult,
        UserStoreClientDto,
        UserStoreApiError
    >("/user", async (url, body) => {
        let photo = null;
        let wallpaper = null;
        if (body.photo) {
            const { files } = await uploadApi(`/api${userUrlPhoto}`, {
                file: body.photo,
                name: body.user_name || body.email || "user",
            });
            photo = files;
        }
        if (body.wallpaper) {
            const { files } = await uploadApi(`/api${userUrlWallpaper}`, {
                file: body.photo,
                name: body.user_name || body.email || "user",
            });
            wallpaper = files;
        }

        const response = await fetch(`/api${url}`, {
            method: "POST",
            body: JSON.stringify({ ...body, photo, wallpaper }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await response.json();
        if (!response.ok) {
            throw result;
        }
        memory.delete("/api/user", true);
        return result;
    });
}
interface UserStoreApiResult {
    success: true;
    user: UserSchema;
}
interface UserStoreApiError {
    success: false;
    message: string;
    body: keyof UserStoreDto;
}
/**
 * update - /api/user
 * @method PUT
 */
export function userUpdateApi(id: number) {
    return useMutation<UserUpdateApiResult, UserUpdateDto, UserUpdateApiError>(
        `/user/${id}`,
        async (url, body) => {
            const response = await fetch(`/api${url}`, {
                method: "PUT",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();
            if (!response.ok) {
                throw result;
            }
            memory.delete("/api/user", true);
            return result;
        }
    );
}
interface UserUpdateApiResult {
    success: true;
    message: string;
}
interface UserUpdateApiError {
    success: false;
    message: string;
    body: keyof UserUpdateDto;
}

export function userUpdatePasswordApi(id: number) {
    return useMutation<
        UserUpdatePasswordApiResult,
        UserUpdatePasswordDto,
        UserUpdatePasswordApiError
    >(`/user/${id}/update-password`, async (url, body) => {
        const response = await fetch(`/api${url}`, {
            method: "PUT",
            body: JSON.stringify(body),
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
interface UserUpdatePasswordApiResult {
    success: true;
    message: string;
}
interface UserUpdatePasswordApiError {
    success: false;
    message: string;
    body: keyof UserUpdatePasswordDto;
}

export function userUpdatePhotoApi(id: number) {
    return useMutation<
        ResultApiImages,
        UserUpdatePhotoDto & { name: string },
        ResultApiImagesError<UserUpdatePhotoDto>
    >(`${userUrlPhoto}/${id}`, async (url, body) => {
        const result = await uploadApi(`/api${url}`, {
            name: body.name,
            file: body.photo,
        });
        memory.delete("/api/user", true);
        return result;
    });
}
export interface UserNormalUpdateImagesAPI {
    success: boolean;
    message: string;
}

/**
 * show - /api/user/:id
 * @method GET
 */
export function userShowApi(id: number, skipFetching = false) {
    return useQuery<UserShowApiResult, UserShowApiError>(
        `/user/${id}`,
        async (url) => {
            const cachename = `/api${url}`;
            let result = memory.get(cachename);
            if (!result) {
                const response = await fetch(cachename);
                result = await response.json();
                if (!response.ok) {
                    throw result;
                }
                memory.set(cachename, result);
            }

            return result;
        },
        {
            skipFetching,
        }
    );
}
interface UserShowApiResult {
    success: true;
    user: UserSchemaFromServer;
}
interface UserShowApiError {
    success: false;
    message: string;
}
/**
 * destroy - /api/user
 * @method DELETE
 */
export function userDestroyApi() {
    return useMutation<UserUpdateApiResult, number, UserUpdateApiError>(
        "/user",
        async (url, id) => {
            const response = await fetch(`/api${url}/${id}`, {
                method: "DELETE",
            });
            const result = await response.json();
            if (!response.ok) {
                throw result;
            }
            memory.delete("/api/user", true);
            return result;
        }
    );
}
