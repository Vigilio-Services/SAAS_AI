import path from "node:path";
import preact from "@preact/preset-vite";
import tailwindcss from "@tailwindcss/vite";
import dotenv from "dotenv";
import { defineConfig } from "vite";

dotenv.config({ path: ".env" });

export default defineConfig({
    plugins: [
        tailwindcss(),
        // liveReload([path.resolve(__dirname, "./src/views/**/*.html")]),
        // million.vite({ auto: true }),
        preact(),
    ],
    root: "src",
    resolve: {
        // RESOURCES ALIAS
        alias: {
            "@services": path.resolve(__dirname, "src", "services"),
            "@contexts": path.resolve(__dirname, "src", "contexts"),
            "@hooks": path.resolve(__dirname, "src", "hooks"),
            "@libs": path.resolve(__dirname, "src", "libs"),
            "@components": path.resolve(__dirname, "src", "components"),
            "@config": path.resolve(__dirname, "src", "config"),
            "~": path.resolve(__dirname, "src"),
        },
    },
    base: process.env.NODE_ENV === "production" ? "/dist/" : "/",
    build: {
        outDir: path.resolve(__dirname, "public", "dist"),
        emptyOutDir: true,
        manifest: true,
        rollupOptions: {
            input: path.resolve(__dirname, "src", "pages", "main.tsx"),
            output: {
                manualChunks(id) {
                    // separa dependencias de node_modules en un chunk vendor
                    if (id.includes("node_modules")) {
                        return "vendor";
                    }
                },
            },
        },
    },
    server: {
        strictPort: true,
        port: Number(process.env.VITE_PORT),
        host: true,
        watch: {
            usePolling: true, // docker
        },
    },
});
