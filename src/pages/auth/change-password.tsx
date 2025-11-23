import Alert from "@components/extras/alert";
import FormSection from "@components/extras/form-section";
import Form from "@components/form";
import { handlerError, sizeIcon } from "@libs/client/helpers";
import { authChangePasswordProfileApi } from "@services/auth/apis/auth.api";
import {
    AuthChangePasswordProfileDto,
    authChangePasswordProfileDto,
} from "@services/auth/dtos/auth.dto";
import { LockIconSolid } from "@vigilio/react-icons";
import { sweetModal } from "@vigilio/sweet";
import { valibotResolver } from "@vigilio/valibot/resolver";
import { useForm } from "react-hook-form";

export function ChangePasswordProfile() {
    const authChangePasswordProfileMutation = authChangePasswordProfileApi();
    const authPasswordForm = useForm<AuthChangePasswordProfileDto>({
        resolver: valibotResolver(authChangePasswordProfileDto),
        defaultValues: {
            password: "",
            new_password: "",
            repeat_new_password: "",
        },
    });

    function onChangePassword(body: AuthChangePasswordProfileDto) {
        if (!body.password) {
            authPasswordForm.setError("password", {
                message: "Contraseña es requerida",
            });
            return;
        }
        if (!body.new_password) {
            authPasswordForm.setError("new_password", {
                message: "Contraseña nueva es requerida",
            });
            return;
        }
        if (!body.repeat_new_password) {
            authPasswordForm.setError("repeat_new_password", {
                message: "Repetir contraseña nueva es requerida",
            });
            return;
        }
        if (body.password !== body.repeat_new_password) {
            authPasswordForm.setError("repeat_new_password", {
                message: "Contraseña no similares",
            });
            return;
        }
        sweetModal({
            title: "Cambiar contraseña",
        }).then(({ isConfirmed }) => {
            if (isConfirmed) {
                authChangePasswordProfileMutation.mutate(body, {
                    onSuccess: (data) => {
                        sweetModal({
                            icon: "success",
                            title: data.message,
                            showCancelButton: false,
                        });
                    },
                    onError: (error) => {
                        handlerError(
                            authPasswordForm,
                            error,
                            "Error al cambiar la contraseña"
                        );
                    },
                });
            }
        });
    }

    return (
        <div>
            {authChangePasswordProfileMutation.isSuccess ? (
                <div>
                    <Alert
                        type="success"
                        title="Contraseña cambiada correctamente"
                        message="La contraseña se ha cambiado correctamente."
                    />
                </div>
            ) : (
                <>
                    {" "}
                    <FormSection
                        ico={<LockIconSolid {...sizeIcon.large} />}
                        title="Cambiar contraseña"
                    />
                    <Form {...authPasswordForm} onSubmit={onChangePassword}>
                        <Form.control<AuthChangePasswordProfileDto>
                            name="password"
                            title="Contraseña actual"
                            placeholder="******"
                            required
                            type="password"
                            ico={<LockIconSolid />}
                        />
                        <Form.control<AuthChangePasswordProfileDto>
                            name="new_password"
                            title="Contraseña nueva"
                            placeholder="******"
                            required
                            type="password"
                            ico={<LockIconSolid />}
                        />
                        <Form.control<AuthChangePasswordProfileDto>
                            name="repeat_new_password"
                            title="Repetir contraseña nueva"
                            placeholder="******"
                            required
                            type="password"
                            ico={<LockIconSolid />}
                        />
                        <Form.button.submit
                            title="Cambiar contraseña"
                            loading_title="Cambiando cotranseña"
                            disabled={
                                authChangePasswordProfileMutation.isLoading ||
                                false
                            }
                            isLoading={
                                authChangePasswordProfileMutation.isLoading ||
                                false
                            }
                        />
                    </Form>
                </>
            )}
        </div>
    );
}
