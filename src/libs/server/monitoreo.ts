import Logger from "./logger";
import os from "node:os";

/**
 * Monitorea la memoria y el uso de CPU del servidor
 * @returns void
 */
export function monitoreo() {
	setInterval(() => {
		const memoriaLibreMB = os.freemem() / (1024 * 1024);
		const memoriaTotalMB = os.totalmem() / (1024 * 1024);
		const usoCPU = os.loadavg(); // Carga promedio en 1, 5 y 15 minutos

		Logger.info(
			`
            Memoria libre: ${memoriaLibreMB.toFixed(2)} MB
            Memoria usada: ${(memoriaTotalMB - memoriaLibreMB).toFixed(2)} MB
            Uso de CPU: ${usoCPU}
        `,
		);
	}, 30000);
}
