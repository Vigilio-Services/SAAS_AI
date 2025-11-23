import axios from "axios";
import environments from "../config/environments";

export async function generateImage(body: NanoBananaBody) {
    try {
        const response = await axios.post<NanoBananaResponse>(
            "https://api.nanobananaapi.ai/api/v1/nanobanana/generate",
            body,
            {
                headers: {
                    Authorization: `Bearer ${environments.GEMINI_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("Respuesta:", response.data);
    } catch (error: any) {
        console.error("Error:", error.response?.data || error.message);
    }
}
interface NanoBananaBody {
    prompt: string;
    type: "IMAGETOIAMGE" | "TEXTTOIAMGE";
    imageUrls: string[];
    callBackUrl: string;
    image_size:
        | "1:1"
        | "9:16"
        | "16:9"
        | "3:4"
        | "4:3"
        | "3:2"
        | "2:3"
        | "5:4"
        | "4:5"
        | "21:9";
    numImages?: number; // default 1
    watermark?: string; // nano banana
}
interface NanoBananaResponse {
    code: 200 | 400 | 402 | 500;
    msg: string;
    data: {
        taskId: string;
    };
}
