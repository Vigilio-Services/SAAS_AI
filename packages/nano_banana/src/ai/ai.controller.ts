import type { Request, Response } from "express";
import { downloadFile } from "../helpers";

export function nanoBananaWebhook(req: Request, res: Response) {
    const { code, msg, data } = req.body;

    console.log("Received NanoBanana image generation callback:", {
        taskId: data.taskId,
        status: code,
        message: msg,
    });

    if (code === 200) {
        // Task completed successfully
        console.log("NanoBanana image generation completed successfully");

        const { taskId, info } = data;
        const { resultImageUrl } = info;

        console.log(`Generated image URL: ${resultImageUrl}`);

        // Download the generated image
        if (resultImageUrl) {
            downloadFile(resultImageUrl, `nanobanana_result_${taskId}.jpg`)
                .then(() =>
                    console.log("Generated image downloaded successfully")
                )
                .catch((err) =>
                    console.error("Failed to download generated image:", err)
                );
        }
    } else {
        // Task failed
        console.log("NanoBanana image generation failed:", msg);

        // Handle specific error types
        if (code === 400) {
            console.log("Content policy violation - please adjust your prompt");
        } else if (code === 500) {
            console.log("Internal error - please try again later");
        } else if (code === 501) {
            console.log(
                "Generation task failed - may need to adjust parameters"
            );
        }
    }

    // Return 200 status code to confirm callback receipt
    res.status(200).json({ status: "received" });
}
