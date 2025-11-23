import fs from "fs";
import https from "https";

export function downloadFile(url: string, filename: string) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filename);
        https
            .get(url, (response) => {
                if (response.statusCode === 200) {
                    response.pipe(file);
                    file.on("finish", () => {
                        file.close();
                        resolve(true);
                    });
                } else {
                    reject(new Error(`HTTP ${response.statusCode}`));
                }
            })
            .on("error", reject);
    });
}
