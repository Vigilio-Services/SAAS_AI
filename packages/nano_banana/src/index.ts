import express from "express";
import environments from "./config/environments";
import { nanoBananaWebhook } from "./ai/ai.controller";
import { generateImage } from "./helpers/generateImage";
// https://docs.nanobananaapi.ai/nanobanana-api/generate-or-edit-image
const app = express();

app.get("/generate-image", async (req, res) => {
    const result = await generateImage({
        prompt: "A serene mountain landscape at sunset with a lake reflecting the orange sky, con la imagen mandada",
        type: "TEXTTOIAMGE",
        imageUrls: [
            "https://i.pinimg.com/736x/a0/f6/d8/a0f6d8722e2ca13e433591c68bc5401f.jpg",
        ],
        callBackUrl: "https://1d8cecc8461f.ngrok-free.app/callback",
        image_size: "16:9",
        numImages: 1,
        watermark: "Vigilio Yonatan",
    });
    return res.json(result);
});
// app.get("/nanobanana-callback", nanoBananaWebhook);
app.post("/callback", nanoBananaWebhook);

app.listen(environments.PORT, () => {
    console.log(`Server running on port ${environments.PORT}`);
});
