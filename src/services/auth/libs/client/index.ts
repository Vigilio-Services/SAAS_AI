import { authRefreshTokenApi } from "../../apis/auth.api";

interface ApiError {
	message: string;
	status?: number;
	expired?: boolean;
}

interface RefreshTokenResponse {
	accessToken: string;
}

interface AuthResponse<T> extends Response {
	json(): Promise<T>;
}
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function fetchWithAuth<T = any>(
	input: RequestInfo,
	init?: RequestInit,
): Promise<AuthResponse<T>> {
	// Añadir token de acceso a los headers si existe
	const accessToken = localStorage.getItem("access_token");
	const headers = new Headers(init?.headers);

	if (accessToken && !headers.has("Authorization")) {
		headers.set("Authorization", `Bearer ${accessToken}`);
	}

	let response = await fetch(input, {
		...init,
		headers,
		credentials: "include",
	});

	// Si la respuesta es 401 y es por token expirado
	if (response.status === 401) {
		try {
			const errorData: ApiError = await response.clone().json();
			if (errorData.expired) {
				// Intentar refrescar el token
				const newToken = await authRefreshTokenApi();
				if (newToken) {
					// Actualizar el header con el nuevo token
					headers.set("Authorization", `Bearer ${newToken}`);

					// Reintentar la petición original
					response = await fetch(input, {
						...init,
						headers,
						credentials: "include",
					});
					return response as AuthResponse<T>;
				}
				// Redirigir a login si el refresh falla
				// window.location.href = "/auth/login";
				throw new Error("Session expired");
			}
		} catch (error) {
			console.error(
				`Error parsing error response: ${(error as Error).message}`,
			);
		}
	}

	if (!response.ok) {
		const error: ApiError = {
			message: `HTTP error! status: ${response.status}`,
			status: response.status,
		};

		try {
			const errorData = await response.clone().json();
			Object.assign(error, errorData);
		} catch (_) {
			// No se pudo parsear el cuerpo de error
		}

		throw error;
	}

	return response as AuthResponse<T>;
}
