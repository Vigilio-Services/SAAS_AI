import Modal from "@components/extras/modal";
import Form from "@components/form";
import enviroments from "@config/client/environments.config";
import { useEmpresaContext } from "@contexts/empresa.context";
import { ocultarEmail, sizeIcon } from "@libs/client/helpers";
import { useSignal } from "@preact/signals";
import {
    authForgotPasswordApi,
    authLoginApi,
} from "@services/auth/apis/auth.api";
import {
    AuthForgotPasswordDto,
    AuthLoginDto,
    authForgotPasswordDto,
    authLoginDto,
} from "@services/auth/dtos/auth.dto";
import { UserSchema } from "@services/user/schemas/user.schema";
import {
    CircleExclamationIconSolid,
    EnvelopeIconSolid,
    LockIconSolid,
    UserIconSolid,
} from "@vigilio/react-icons/fontawesome";
import { sweetModal } from "@vigilio/sweet";
import { valibotResolver } from "@vigilio/valibot/resolver";
import { useCallback } from "preact/hooks";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";

function AuthenticationPage() {
    const empresaContext = useEmpresaContext();
    const changePassword = useSignal<boolean>(false);
    const isChangePasswordCorrect = useSignal<string | null>(null);

    const authLoginForm = useForm<AuthLoginDto>({
        resolver: valibotResolver(authLoginDto),
    });
    const authForgotPasswordForm = useForm<AuthForgotPasswordDto>({
        resolver: valibotResolver(authForgotPasswordDto),
    });

    const authLoginMutation = authLoginApi();
    const authForgotPasswordMutation = authForgotPasswordApi();

    const isVerified = useSignal<boolean>(false);
    const showErrorIsVertified = useSignal<boolean>(false);
    const isVerifiedOlvidatePassword = useSignal<boolean>(false);
    const showErrorIsVerifiedOlvidatePassword = useSignal<boolean>(false);

    // loguea el user
    function onAuthLogin(body: AuthLoginDto) {
        if (!isVerified.value && enviroments.VITE_ENV === "production") {
            showErrorIsVertified.value = true;
            return;
        }
        authLoginMutation.mutate(body, {
            onSuccess(data) {
                if (data.user.status === "activo") {
                    if (
                        (
                            [
                                "academico",
                                "administracion",
                                "super-admin",
                            ] satisfies UserSchema["role"][]
                        ).includes(data.user.role)
                    ) {
                        window.location.href = "/interno";
                        return;
                    }
                    if (data.user.role === "estudiante") {
                        window.location.href = "/empresa";
                        return;
                    }
                    window.location.href = "/";
                    return;
                }
            },
            onError() {
                authLoginForm.reset();
            },
        });
    }
    function onForgotPassword(body: AuthForgotPasswordDto) {
        if (
            !isVerifiedOlvidatePassword.value &&
            enviroments.VITE_ENV === "production"
        ) {
            showErrorIsVerifiedOlvidatePassword.value = true;
            return;
        }
        authForgotPasswordMutation.mutate(body, {
            onSuccess() {
                sweetModal({
                    icon: "success",
                    title: "Correo electrónico correcto",
                    text: "Se envió correo de verificación en tu buzón",
                    showCancelButton: false,
                });
            },
            onError() {
                authForgotPasswordForm.reset();
            },
        });
    }

    const onRecaptchaChange = useCallback((token: string | null) => {
        isVerified.value = !!token;
    }, []);
    const onRecaptchaPasswordChange = useCallback((token: string | null) => {
        isVerifiedOlvidatePassword.value = !!token;
    }, []);

    return (
        <div
            style={{
                backgroundImage: `url(${empresaContext.getFile(
                    "background-authenticacion"
                )})`,
            }}
            class="h-screen w-full flex md:justify-center p-4 bg-cover items-center bg-no-repeat "
        >
            <div class="bg-white max-w-[500px] w-full flex flex-col gap-4 items-center justify-center  shadow-xl p-12 rounded-xl">
                <div class="flex flex-col items-center">
                    <img
                        src={empresaContext.getFile("logo")}
                        width={100}
                        alt="cear latinoamericano logo"
                        title="cear latinoamericano logo"
                    />
                    <h3 class="text-primary font-black text-2xl tracking-wide text-center">
                        Empresa Virtual
                    </h3>
                    <p class="text-gray-600 font-semibold text-center flex flex-col justify-center items-center">
                        <span>Accede al espacio digital de aprendizaje de</span>{" "}
                        <span> CEAR LATINOAMERICANO</span>
                    </p>
                </div>
                {authLoginMutation.isError ? (
                    <p class="bg-red-600 text-white p-2 w-full rounded-md text-center items-center font-semibold text-sm flex gap-2 text-center mt-2">
                        <CircleExclamationIconSolid
                            {...sizeIcon.small}
                            class="fill-white"
                        />
                        {authLoginMutation.error?.message}
                    </p>
                ) : null}
                <Form<AuthLoginDto> {...authLoginForm} onSubmit={onAuthLogin}>
                    <Form.control<AuthLoginDto>
                        title="Correo Electrónico"
                        name={"email"}
                        placeholder="tucorreo@xxxx.com"
                        ico={<UserIconSolid />}
                    />
                    <Form.control<AuthLoginDto>
                        title="Contraseña"
                        type="password"
                        name={"password"}
                        placeholder="******"
                        ico={<LockIconSolid />}
                    />
                    <div className="w-full flex justify-center items-center mt-4">
                        <ReCAPTCHA
                            sitekey={enviroments.VITE_CAPTCHA_KEY}
                            className="mx-auto"
                            onChange={onRecaptchaChange}
                        />
                    </div>
                    {showErrorIsVertified.value ? (
                        <p class="text-red-600 text-xs">
                            Este campo es obligatorio
                        </p>
                    ) : (
                        <></>
                    )}
                    <Form.button.submit
                        isLoading={authLoginMutation.isLoading || false}
                        className="w-full flex tracking-wider justify-center py-3 items-center mt-4"
                        disabled={authLoginMutation.isLoading || false}
                        title="Iniciar Sesión"
                        loading_title="Iniciando sesión"
                    />
                </Form>
                <div class="flex flex-col justify-center items-center gap-2 mt-4">
                    <button
                        type="button"
                        class="text-primary text-sm font-semibold hover:underline  text-justify"
                        aria-label="change password"
                        onClick={() => {
                            changePassword.value = true;
                        }}
                    >
                        ¿Olvidaste tu contraseña?
                    </button>
                    <button
                        type="button"
                        class="text-primary text-sm font-semibold hover:underline  text-justify"
                        aria-label="need help"
                    >
                        ¿Necesitas ayuda?
                    </button>
                </div>
            </div>
            <Modal
                isOpen={changePassword.value}
                onClose={() => {
                    changePassword.value = false;
                }}
                contentClassName="!min-h-[auto] !p-0 w-full max-w-[500px]"
                closeOnOverlayClick={false}
            >
                <div class="bg-white  w-full flex flex-col gap-2 rounded-xl p-12">
                    <h2 class="text-2xl font-black text-primary">
                        Olvidaste tu contraseña
                    </h2>
                    <Form
                        {...authForgotPasswordForm}
                        onSubmit={onForgotPassword}
                    >
                        <Form.control<AuthForgotPasswordDto>
                            title="Correo Electrónico"
                            name={"email"}
                            placeholder="tucorreo@xxxx.com"
                            ico={
                                <EnvelopeIconSolid class="w-[16px] h-[16px]" />
                            }
                        />
                        <div className="w-full flex justify-center items-center mt-4">
                            <ReCAPTCHA
                                sitekey={enviroments.VITE_CAPTCHA_KEY}
                                className="mx-auto"
                                onChange={onRecaptchaPasswordChange}
                            />
                        </div>
                        {showErrorIsVerifiedOlvidatePassword.value ? (
                            <p class="text-red-600 text-xs">
                                Este campo es obligatorio
                            </p>
                        ) : (
                            <></>
                        )}
                        <Form.button.submit
                            isLoading={
                                authForgotPasswordMutation.isLoading || false
                            }
                            className="w-full flex tracking-wider justify-center py-3 items-center mt-4"
                            disabled={
                                authForgotPasswordMutation.isLoading || false
                            }
                            title="Enviar"
                            loading_title="Enviando correo"
                        />
                    </Form>
                </div>
            </Modal>
            <Modal
                isOpen={!!isChangePasswordCorrect.value}
                onClose={() => {
                    isChangePasswordCorrect.value = null;
                }}
                contentClassName="!min-h-[auto]"
                closeOnOverlayClick={false}
            >
                <div class="bg-white max-w-[500px] w-full mr-6 shadow-xl px-6 pt-6 rounded-xl flex flex-col justify-center items-center">
                    <h3 class="text-primary font-bold text-2xl tracking-wide text-justify t">
                        MENSAJE ENVIADO
                    </h3>
                    <p class="text-justify font-semibold">
                        Hemos enviado un correo electrònico a{" "}
                        <b class="font-bold">
                            {ocultarEmail(isChangePasswordCorrect.value || "")}
                        </b>{" "}
                        con un enlace para que recuperes el acceso a tu cuenta.
                    </p>{" "}
                    <button
                        type="button"
                        aria-label="accep"
                        class="text-primary font-bold w-full text-center py-3 border-t  mt-2 border-gray-400"
                        onClick={() => {
                            isChangePasswordCorrect.value = null;
                        }}
                    >
                        Aceptar
                    </button>
                </div>
            </Modal>
        </div>
    );
}

export default AuthenticationPage;
