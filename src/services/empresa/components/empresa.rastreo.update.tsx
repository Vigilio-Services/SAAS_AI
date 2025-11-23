import Image from "@components/extras/image";
import Form from "@components/form";
import { animationFadeInUpTailwind, cn, sizeIcon } from "@libs/client/helpers";
import { LinkedinInIconBrand } from "@vigilio/react-icons";
import { valibotResolver } from "@vigilio/valibot/resolver";
import { useForm } from "react-hook-form";
import { ConfiguracionTab } from "src/pages/dashboard/configuracion";
import {
    type EmpresaRastreoUpdateDto,
    empresaRastreoUpdateDto,
} from "../dtos/empresa_rastreo.dto";

interface EmpresaRastreoUpdateProps {
    configuracion_tab: ConfiguracionTab;
}
function EmpresaRastreoUpdate({
    configuracion_tab,
}: EmpresaRastreoUpdateProps) {
    const empresaRastreoUpdateForm = useForm<EmpresaRastreoUpdateDto>({
        resolver: valibotResolver(empresaRastreoUpdateDto),
    });
    // WATCHS
    const rastreoFacebookPixelEnabled = empresaRastreoUpdateForm.watch(
        "facebook_pixel.enabled"
    );
    const rastreoGoogleTagManagerEnabled = empresaRastreoUpdateForm.watch(
        "google_manager.enabled"
    );
    const rastreoTiktokPixelEnabled = empresaRastreoUpdateForm.watch(
        "tiktok_pixel.enabled"
    );
    const rastreoLinkedinTagEnabled = empresaRastreoUpdateForm.watch(
        "linkedin_tag.enabled"
    );
    const empresaRastreoUpdateFormSubmit = async (
        data: EmpresaRastreoUpdateDto
    ) => {
        console.log(data);
    };
    return (
        <Form
            onSubmit={empresaRastreoUpdateFormSubmit}
            {...empresaRastreoUpdateForm}
            className={`${animationFadeInUpTailwind} ${
                configuracion_tab !== "seo" ? "hidden" : ""
            } grid  gap-4`}
        >
            <div class="flex gap-4 items-center bg-background p-4  border border-border rounded-2xl">
                <div class="min-w-[50px] min-h-[50px] rounded-full border border-border fill-blue-600 flex justify-center items-center self-start">
                    <Image
                        src="/settings/images/redes/facebook_pixel.webp"
                        alt="facebook pixel"
                        title="facebook_pixel"
                        size="sm"
                    />
                </div>
                <div class="flex flex-col gap-4  w-full">
                    <div class="flex gap-4 justify-between w-full">
                        <div class="">
                            <h4 class="font-semibold">Facebook Pixel</h4>
                            <p class="text-muted-foreground text-sm">
                                Accept credit cards and digital wallets
                            </p>
                        </div>
                        <div class="w-[80px] self-start">
                            <Form.control.toggle<EmpresaRastreoUpdateDto>
                                name="facebook_pixel.enabled"
                                title=""
                            />
                        </div>
                    </div>
                    <Form.control.area<EmpresaRastreoUpdateDto>
                        name="facebook_pixel.value"
                        title=""
                        className={cn(
                            "bg-transparent!  ring-0!  p-2!",
                            !rastreoFacebookPixelEnabled && "hidden"
                        )}
                        rows={4}
                    />
                </div>
            </div>
            <div class="flex gap-4 items-center bg-background p-4  border border-border rounded-2xl">
                <div class="min-w-[50px] min-h-[50px] rounded-full border border-border fill-blue-600 flex justify-center items-center self-start">
                    <Image
                        src="/settings/images/redes/google_tag_manager.webp"
                        alt="google tag manager"
                        title="google tag manager"
                        size="sm"
                    />
                </div>
                <div class="flex flex-col gap-4  w-full">
                    <div class="flex gap-4 justify-between w-full">
                        <div class="">
                            <h4 class="font-semibold">Google Tag Manager</h4>
                            <p class="text-muted-foreground text-sm">
                                Accept credit cards and digital wallets
                            </p>
                        </div>
                        <div class="w-[80px] self-start">
                            <Form.control.toggle<EmpresaRastreoUpdateDto>
                                name="google_manager.enabled"
                                title=""
                            />
                        </div>
                    </div>
                    <Form.control.area<EmpresaRastreoUpdateDto>
                        name="google_manager.value"
                        title=""
                        className={cn(
                            "bg-transparent!  ring-0!  p-2!",
                            !rastreoGoogleTagManagerEnabled && "hidden"
                        )}
                        rows={4}
                    />
                </div>
            </div>
            <div class="flex gap-4 items-center bg-background p-4  border border-border rounded-2xl">
                <div class="min-w-[50px] min-h-[50px] rounded-full border border-border fill-blue-600 flex justify-center items-center self-start">
                    <Image
                        src="/settings/images/redes/tiktok_pixel.webp"
                        alt="tikTok Pixel"
                        title="tikTok Pixel"
                        size="xs"
                    />
                </div>
                <div class="flex flex-col gap-4  w-full">
                    <div class="flex gap-4 justify-between w-full">
                        <div class="">
                            <h4 class="font-semibold">TikTok Pixel</h4>
                            <p class="text-muted-foreground text-sm">
                                Accept credit cards and digital wallets
                            </p>
                        </div>
                        <div class="w-[80px] self-start">
                            <Form.control.toggle<EmpresaRastreoUpdateDto>
                                name="tiktok_pixel.enabled"
                                title=""
                            />
                        </div>
                    </div>
                    <Form.control.area<EmpresaRastreoUpdateDto>
                        name="tiktok_pixel.value"
                        title=""
                        className={cn(
                            "bg-transparent!  ring-0!  p-2!",
                            !rastreoTiktokPixelEnabled && "hidden"
                        )}
                        rows={4}
                    />
                </div>
            </div>
            <div class="flex gap-4 items-center bg-background p-4  border border-border rounded-2xl">
                <div class="min-w-[50px] min-h-[50px] rounded-full border border-border fill-blue-600 flex justify-center items-center self-start">
                    <LinkedinInIconBrand {...sizeIcon.large} />
                </div>
                <div class="flex flex-col  gap-4 w-full">
                    <div class="flex gap-4 justify-between w-full">
                        <div class="">
                            <h4 class="font-semibold">Linkedin Tag</h4>
                            <p class="text-muted-foreground text-sm">
                                Accept credit cards and digital wallets
                            </p>
                        </div>
                        <div class="w-[80px] self-start">
                            <Form.control.toggle<EmpresaRastreoUpdateDto>
                                name="linkedin_tag.enabled"
                                title=""
                            />
                        </div>
                    </div>
                    <Form.control.area<EmpresaRastreoUpdateDto>
                        name="linkedin_tag.value"
                        title=""
                        className={cn(
                            "bg-transparent!  ring-0!  p-2!",
                            !rastreoLinkedinTagEnabled && "hidden"
                        )}
                        rows={4}
                    />
                </div>
            </div>
        </Form>
    );
}

export default EmpresaRastreoUpdate;
