import {
    userSchema,
    UserSchemaFromServer,
} from "@services/user/schemas/user.schema";
import {
    type Input,
    merge,
    nonNullable,
    object,
    pick,
    string,
} from "@vigilio/valibot";

export const authLoginDto = object({
    email: nonNullable(userSchema.entries.email, "Esta campo es obligatorio."),
    password: nonNullable(
        userSchema.entries.password,
        "Esta campo es obligatorio."
    ),
});
export type AuthLoginDto = Input<typeof authLoginDto>;

export const authForgotPasswordDto = object({
    email: nonNullable(userSchema.entries.email),
});
export type AuthForgotPasswordDto = Input<typeof authForgotPasswordDto>;

export const authChangePasswordDto = merge([
    authLoginDto,
    object({ repeat_password: string() }),
]);
export type AuthChangePasswordDto = Input<typeof authChangePasswordDto>;

export const authChangePasswordProfileDto = object({
    password: nonNullable(
        userSchema.entries.email,
        "Esta campo es obligatorio."
    ),
    new_password: nonNullable(
        userSchema.entries.password,
        "Esta campo es obligatorio."
    ),
    repeat_new_password: nonNullable(
        userSchema.entries.password,
        "Esta campo es obligatorio."
    ),
});

export type AuthChangePasswordProfileDto = Input<
    typeof authChangePasswordProfileDto
>;

export type UserAuth = UserSchemaFromServer;

export const authProfileUpdateDto = pick(userSchema, [
    "telefono",
    "email",
    "address",
    "enabled_notifications_webpush",
]);
export type AuthProfileUpdateDto = Input<typeof authProfileUpdateDto>;
