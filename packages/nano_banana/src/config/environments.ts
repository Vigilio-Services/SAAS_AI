import dotenv from "dotenv";
dotenv.config({ path: ".env" });

export default {
    PORT: process.env.PORT || 4000,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
};
