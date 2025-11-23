// CURSO TYPE
import { memory, useMutation, useQuery } from "@vigilio/preact-fetching";
import { AddressStoreDto, AddressUpdateDto } from "../dtos/address.dto";
import type {
    AddressSchema,
    AddressSchemaFromServer,
} from "../schemas/address.schema";

/**
 * index - /api/address
 * @method GET
 */
export function addressIndexApi() {
    const query = useQuery<AdressIndexApi, AdressIndexApiError>(
        "/address",
        async (url) => {
            const urlChache = `/api${url}`;
            let result = memory.get(urlChache);
            if (!result) {
                const response = await fetch(urlChache);
                result = await response.json();
                if (!response.ok) {
                    throw result;
                }
                memory.set(urlChache, result);
            }
            return result;
        }
    );
    return query;
}
interface AdressIndexApi {
    success: true;
    data: AddressSchemaFromServer[];
}
interface AdressIndexApiError {
    success: false;
    message: string;
}

/**
 * store - /api/address
 * @method POST
 */
export function addressStoreApi() {
    return useMutation<
        AddressStoreApiResult,
        AddressStoreDto,
        AddressStoreApiError
    >("/address", async (url, body) => {
        const response = await fetch(`/api${url}`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await response.json();
        if (!response.ok) {
            throw result;
        }
        memory.delete("/api/address", true);
        return result;
    });
}
interface AddressStoreApiResult {
    success: true;
    address: AddressSchema;
}
interface AddressStoreApiError {
    success: false;
    message: string;
    body: keyof AddressStoreDto;
}
/**
 * update - /api/address/:id
 * @method PUT
 */
export function addressUpdateApi(id: number) {
    return useMutation<
        AddressUpdateApiResult,
        AddressUpdateDto,
        AddressUpdateApiError
    >(`/address/${id}`, async (url, body) => {
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
        memory.delete("/api/address", true);

        return result;
    });
}
interface AddressUpdateApiResult {
    success: true;
    message: string;
}
interface AddressUpdateApiError {
    success: false;
    message: string;
    body: keyof AddressStoreDto;
}

/**
 * show - /api/address/:id
 * @method GET
 */
export function addressShowApi(id: number) {
    return useQuery<AddressShowApiResult, AddressShowApiError>(
        `/address/${id}`,
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
        }
    );
}
interface AddressShowApiResult {
    success: true;
    address: AddressSchemaFromServer;
}
interface AddressShowApiError {
    success: false;
    message: string;
}
