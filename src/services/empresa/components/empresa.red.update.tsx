import Form from "@components/form";
import { animationFadeInUpTailwind, cn, sizeIcon } from "@libs/client/helpers";
import {
    FacebookFIconBrand,
    InstagramIconBrand,
    LinkedinInIconBrand,
    TiktokIconBrand,
    XTwitterIconBrand,
    YoutubeIconBrand,
} from "@vigilio/react-icons";
import { useForm } from "react-hook-form";
import { ConfiguracionTab } from "src/pages/dashboard/configuracion";
import { EmpresaUpdateDto } from "../dtos/empresa.dto";

type EmpresaRedUpdateProps = {
    form: ReturnType<typeof useForm<EmpresaUpdateDto>>;
    configuracion_tab: ConfiguracionTab;
};
function EmpresaRedUpdate({ form, configuracion_tab }: EmpresaRedUpdateProps) {
    const redFacebookEnabled = form.watch("red.facebook.enabled");
    const redInstagramEnabled = form.watch("red.instagram.enabled");
    const redLinkedinEnabled = form.watch("red.linkedin.enabled");
    const redTikTokEnabled = form.watch("red.tiktok.enabled");
    const redXEnabled = form.watch("red.x.enabled");
    const redYoutubeEnabled = form.watch("red.youtube.enabled");
    return (
        <div
            style={{
                display: configuracion_tab !== "social-media-tab" ? "none" : "",
            }}
            class={`${animationFadeInUpTailwind} grid  gap-4`}
        >
            {/* facebook */}
            <div class="flex gap-4 items-center bg-background p-4  border border-border rounded-2xl">
                <div class="min-w-[50px] min-h-[50px] rounded-full border border-border fill-blue-600 flex justify-center items-center self-start">
                    <FacebookFIconBrand {...sizeIcon.large} />
                </div>
                <div class="flex flex-col w-full">
                    <div class="flex justify-between ">
                        <h3 class="font-bold">Facebook url</h3>
                        <div class="w-[80px] self-start">
                            <Form.control.toggle<EmpresaUpdateDto>
                                name="red.facebook.enabled"
                                title=""
                            />
                        </div>
                    </div>
                    <Form.control<EmpresaUpdateDto>
                        name="red.facebook.value"
                        title=""
                        className={cn(
                            "bg-transparent! border-0!  ring-0! p-0!",
                            !redFacebookEnabled && "opacity-40"
                        )}
                        placeholder="https://www.facebook.com/xxxx"
                    />
                </div>
            </div>
            {/* instagram */}
            <div class="flex gap-4 items-center bg-background p-4  border border-border rounded-2xl">
                <div class="min-w-[50px] min-h-[50px] rounded-full border border-border fill-blue-600 flex justify-center items-center self-start">
                    <InstagramIconBrand {...sizeIcon.large} />
                </div>
                <div class="flex flex-col w-full">
                    <div class="flex justify-between ">
                        <h3 class="font-bold">Instagram url</h3>
                        <div class="w-[80px] self-start">
                            <Form.control.toggle<EmpresaUpdateDto>
                                name="red.instagram.enabled"
                                title=""
                            />
                        </div>
                    </div>
                    <Form.control<EmpresaUpdateDto>
                        name="red.instagram.value"
                        title=""
                        className={cn(
                            "bg-transparent! border-0!  ring-0! p-0!",
                            !redInstagramEnabled && "opacity-40"
                        )}
                        placeholder="https://www.instagram.com/xxxx"
                    />
                </div>
            </div>
            {/* tik tok */}
            <div class="flex gap-4 items-center bg-background p-4  border border-border rounded-2xl">
                <div class="min-w-[50px] min-h-[50px] rounded-full border border-border fill-black dark:fill-white flex justify-center items-center self-start ">
                    <TiktokIconBrand {...sizeIcon.large} />
                </div>
                <div class="flex flex-col w-full">
                    <div class="flex justify-between ">
                        <h3 class="font-bold">TikTok url</h3>
                        <div class="w-[80px] self-start">
                            <Form.control.toggle<EmpresaUpdateDto>
                                name="red.tiktok.enabled"
                                title=""
                            />
                        </div>
                    </div>
                    <Form.control<EmpresaUpdateDto>
                        name="red.tiktok.value"
                        title=""
                        className={cn(
                            "bg-transparent! border-0!  ring-0! p-0!",
                            !redTikTokEnabled && "opacity-40"
                        )}
                        placeholder="https://www.tiktok.com/xxxx"
                    />
                </div>
            </div>
            {/* Youtube */}
            <div class="flex gap-4 items-center bg-background p-4  border border-border rounded-2xl">
                <div class="min-w-[50px] min-h-[50px] rounded-full border border-border fill-[#FF0133] flex justify-center items-center self-start ">
                    <YoutubeIconBrand {...sizeIcon.large} />
                </div>
                <div class="flex flex-col w-full">
                    <div class="flex justify-between ">
                        <h3 class="font-bold">Youtube url</h3>
                        <div class="w-[80px] self-start">
                            <Form.control.toggle<EmpresaUpdateDto>
                                name="red.youtube.enabled"
                                title=""
                            />
                        </div>
                    </div>
                    <Form.control<EmpresaUpdateDto>
                        name="red.youtube.value"
                        title=""
                        className={cn(
                            "bg-transparent! border-0!  ring-0! p-0!",
                            !redYoutubeEnabled && "opacity-40"
                        )}
                        placeholder="https://www.youtube.com/xxxx"
                    />
                </div>
            </div>
            {/* Linkedin */}
            <div class="flex gap-4 items-center bg-background p-4  border border-border rounded-2xl">
                <div class="min-w-[50px] min-h-[50px] rounded-full border border-border fill-[#0D62B8] flex justify-center items-center self-start ">
                    <LinkedinInIconBrand {...sizeIcon.large} />
                </div>
                <div class="flex flex-col w-full">
                    <div class="flex justify-between ">
                        <h3 class="font-bold">Linkedin url</h3>
                        <div class="w-[80px] self-start">
                            <Form.control.toggle<EmpresaUpdateDto>
                                name="red.linkedin.enabled"
                                title=""
                            />
                        </div>
                    </div>
                    <Form.control<EmpresaUpdateDto>
                        name="red.linkedin.value"
                        title=""
                        className={cn(
                            "bg-transparent! border-0!  ring-0! p-0!",
                            !redLinkedinEnabled && "opacity-40"
                        )}
                        placeholder="https://www.linkedin.com/xxxx"
                    />
                </div>
            </div>
            {/* X twitter */}
            <div class="flex gap-4 items-center bg-background p-4  border border-border rounded-2xl">
                <div class="min-w-[50px] min-h-[50px] rounded-full border border-border fill-black dark:fill-white flex justify-center items-center self-start ">
                    <XTwitterIconBrand {...sizeIcon.large} />
                </div>
                <div class="flex flex-col w-full">
                    <div class="flex justify-between ">
                        <h3 class="font-bold">X url</h3>
                        <div class="w-[80px] self-start">
                            <Form.control.toggle<EmpresaUpdateDto>
                                name="red.x.enabled"
                                title=""
                                placeholder="https://www.x.com/xxxx"
                            />
                        </div>
                    </div>
                    <Form.control<EmpresaUpdateDto>
                        name="red.x.value"
                        title=""
                        className={cn(
                            "bg-transparent! border-0!  ring-0! p-0!",
                            !redXEnabled && "opacity-40"
                        )}
                    />
                </div>
            </div>
        </div>
    );
}

export default EmpresaRedUpdate;
