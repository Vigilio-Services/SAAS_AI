import path from "node:path";
import { addAlias } from "module-alias";

// here more absolute paths
addAlias("@src", path.resolve(__dirname));
addAlias("@services", path.resolve(__dirname, "services"));
addAlias("@config", path.resolve(__dirname, "config"));
addAlias("@libs", path.resolve(__dirname, "libs"));
addAlias("@components", path.resolve(__dirname, "components"));
addAlias("@contexts", path.resolve(__dirname, "contexts"));
addAlias("@config", path.resolve(__dirname, "config"));

import { Server } from "./config/server";

const application = new Server();
export const app = application.app;
export const server = application.listen();
