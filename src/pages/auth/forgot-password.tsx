import Form from "@components/form";
import { handlerError } from "@libs/client/helpers";
import { useSignal } from "@preact/signals";
import { authChangePasswordApi } from "@services/auth/apis/auth.api";
import {
    AuthChangePasswordDto,
    authChangePasswordDto,
} from "@services/auth/dtos/auth.dto";
import { UserSchema } from "@services/user/schemas/user.schema";
import { LockIconSolid } from "@vigilio/react-icons/fontawesome";
import { sweetModal } from "@vigilio/sweet";
import { valibotResolver } from "@vigilio/valibot/resolver";
import { useCallback, useEffect } from "preact/hooks";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";

interface ForgotPasswordPageProps {
    user: Pick<UserSchema, "user_name" | "email">;
}
function ForgotPasswordPage({ user }: ForgotPasswordPageProps) {
    const isVerified = useSignal<boolean>(false);
    const authChangePasswordMutation = authChangePasswordApi();
    const authChangePasswordForm = useForm<AuthChangePasswordDto>({
        resolver: valibotResolver(authChangePasswordDto),
        defaultValues: { email: user.email! },
    });
    const password = authChangePasswordForm.watch("password");
    const repeat_password = authChangePasswordForm.watch("repeat_password");

    function onChangePassword(body: AuthChangePasswordDto) {
        authChangePasswordMutation.mutate(body, {
            onSuccess() {
                sweetModal({
                    icon: "success",
                    title: "Se cambió contraseña correctamente",
                    timer: 6,
                    showCancelButton: false,
                }).then(() => {
                    window.location.href = "/auth/lohin";
                });
            },
            onError(error) {
                handlerError(
                    authChangePasswordForm,
                    error,
                    "No se cambió contraseña correctamente"
                );
            },
        });
    }

    const SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
    const onRecaptchaChange = useCallback((token: string | null) => {
        isVerified.value = !!token;
    }, []);

    useEffect(() => {
        // si contraseña y repetir contraseña no son similares,
        if (repeat_password?.length && repeat_password !== password) {
            authChangePasswordForm.setError("repeat_password", {
                message: "Contraseña no similares",
            });
        }
    }, [repeat_password]);
    return (
        <div
            style={{
                backgroundImage:
                    "url(/images/settings/background-authenticacion.webp)",
            }}
            class="h-screen w-full flex justify-end bg-cover items-center bg-no-repeat "
        >
            <div class="bg-white max-w-[500px] w-full mr-6 shadow-xl p-12 rounded-xl">
                <h3 class="text-primary font-bold text-2xl tracking-wide text-center">
                    Recuperar Contraseña
                </h3>
                {user ? (
                    <>
                        <p class="block text-center text-gray-600 font-bold mt-4">
                            Hola,
                            <b>{user.user_name}</b> Estás apundo de recuperar tu
                            contraseña
                        </p>
                        {authChangePasswordMutation.isError ? (
                            <p class="text-red-600 font-semibold text-sm text-center mt-2">
                                {authChangePasswordMutation.error?.message}
                            </p>
                        ) : null}
                        <Form<AuthChangePasswordDto>
                            {...authChangePasswordForm}
                            onSubmit={onChangePassword}
                        >
                            <Form.control<AuthChangePasswordDto>
                                title="Contraseña"
                                type="password"
                                name={"password"}
                                placeholder="******"
                                ico={<LockIconSolid />}
                            />
                            <Form.control<AuthChangePasswordDto>
                                title="Repetir Contraseña"
                                type="password"
                                name={"repeat_password"}
                                placeholder="******"
                                ico={<LockIconSolid />}
                            />
                            <div className="w-full flex justify-center items-center mt-4">
                                <ReCAPTCHA
                                    sitekey={SITE_KEY}
                                    className="mx-auto"
                                    onChange={onRecaptchaChange}
                                />
                            </div>
                            <Form.button.submit
                                isLoading={
                                    authChangePasswordMutation.isLoading ||
                                    false
                                }
                                className="w-full flex tracking-wider justify-center py-3 items-center mt-4"
                                disabled={
                                    authChangePasswordMutation.isLoading ||
                                    false
                                }
                                title="Cambiar contraseña"
                                loading_title="Cambiando contraseña"
                            />
                        </Form>
                    </>
                ) : (
                    <p class="block text-center text-gray-600 font-bold mt-4">
                        Token inválido
                    </p>
                )}
                <div class="flex flex-col justify-center items-center gap-2 mt-4">
                    <a
                        href="/auth/login"
                        class="text-primary text-sm font-semibold hover:underline  text-justify"
                    >
                        Iniciar sesión
                    </a>
                    <button
                        type="button"
                        class="text-primary text-sm font-semibold hover:underline  text-justify"
                        aria-label="need help"
                    >
                        ¿Necesitas ayuda?
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ForgotPasswordPage;
