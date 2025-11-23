import { type Input, omit } from "@vigilio/valibot";
import { addressSchema } from "../schemas/address.schema";

export const addressStoreDto = omit(addressSchema, [
    "id",
    "user_id",
    "empresa_id",
]);
export type AddressStoreDto = Input<typeof addressStoreDto>;

export const addressUpdateDto = omit(addressSchema, [
    "id",
    "user_id",
    "empresa_id",
]);
export type AddressUpdateDto = Input<typeof addressUpdateDto>;
