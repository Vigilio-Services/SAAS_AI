import { useMutation, useQuery } from "@vigilio/preact-fetching";
import type {
	AuthChangePasswordDto,
	AuthChangePasswordProfileDto,
	AuthForgotPasswordDto,
	AuthLoginDto,
	AuthProfileUpdateDto,
	UserAuth,
} from "../dtos/auth.dto";

/** me
 * me /api/auth/me
 * @Get
 */
export function authMeApi() {
	return useQuery<AuthInitialApiResult, AuthInitialApiError>(
		"/auth/me",
		async (url) => {
			const response = await fetch(`/api${url}`);
			const result = await response.json();
			if (!response.ok) {
				throw result;
			}
			return result;
		},
		{ delay: 0.5, retry: 0 },
	);
}

interface AuthInitialApiResult {
	success: boolean;
	user: UserAuth;
}
interface AuthInitialApiError {
	success: boolean;
	message: string;
}
/**
 * login /api/auth/login
 * @POST
 */
export function authLoginApi() {
	return useMutation<AuthLoginApiResult, AuthLoginDto, AuthLoginApiError>(
		"/auth/login",
		async (url, body: AuthLoginDto) => {
			const response = await fetch(`/api${url}`, {
				method: "POST",
				body: JSON.stringify(body),
				headers: {
					"Content-Type": "application/json",
				},
			});
			const result = await response.json();
			if (!response.ok) {
				throw result;
			}
			return result;
		},
	);
}

interface AuthLoginApiResult {
	success: boolean;
	message: string;
	access_token: string;
	refresh_token: string;
	user: UserAuth;
}
interface AuthLoginApiError {
	success: boolean;
	message: string;
}

/**
 * login /api/auth/refresh-token
 * @POST
 */
export async function authRefreshTokenApi() {
	try {
		const response = await fetch("/api/auth/refresh-token", {
			method: "POST",
			credentials: "include",
		});
		if (!response.ok) {
			throw new Error(`Refresh failed with status ${response.status}`);
		}
		const result: AuthRefreshTokenApiResult = await response.json();

		localStorage.setItem("access_token", result.access_token);
		return result.access_token;
	} catch (error) {
		localStorage.removeItem("access_token");
		return null;
	}
}

interface AuthRefreshTokenApiResult {
	success: boolean;
	message: string;
	access_token: string;
}

/**
 * forgot-password /api/auth/forgot-password
 * @POST
 */
export function authForgotPasswordApi() {
	return useMutation<
		AuthForgotPasswordApiResult,
		AuthForgotPasswordDto,
		AuthForgotPasswordApiError
	>("/auth/forgot-password", async (url, body) => {
		const response = await fetch(`/api${url}`, {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const result = await response.json();
		if (!response.ok) {
			throw result;
		}
		return result;
	});
}
interface AuthForgotPasswordApiResult {
	success: boolean;
	message: string;
}
interface AuthForgotPasswordApiError {
	success: boolean;
	message: string;
}
/**
 * change /api/auth/change-password
 * @POST
 */
export function authChangePasswordApi() {
	return useMutation<
		AuthChangePasswordApiResult,
		AuthChangePasswordDto,
		AuthChangePasswordApiError
	>("/auth/change-password", async (url, body) => {
		const response = await fetch(`/api${url}`, {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const result = await response.json();
		if (!response.ok) {
			throw result;
		}
		return result;
	});
}
interface AuthChangePasswordApiResult {
	success: boolean;
	message: string;
}
interface AuthChangePasswordApiError {
	success: boolean;
	message: string;
	body: keyof AuthChangePasswordDto;
}

/**
 * change-password-profile /api/auth/change-password-profile
 * @POST
 */
export function authChangePasswordProfileApi() {
	return useMutation<
		AuthChangePasswordProfileApiResult,
		AuthChangePasswordProfileDto,
		AuthChangePasswordProfileApiError
	>("/auth/change-password-profile", async (url, body) => {
		const response = await fetch(`/api${url}`, {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const result = await response.json();
		if (!response.ok) {
			throw result;
		}
		return result;
	});
}

interface AuthChangePasswordProfileApiResult {
	success: boolean;
	message: string;
}
interface AuthChangePasswordProfileApiError {
	success: boolean;
	message: string;
	body: keyof AuthChangePasswordProfileDto;
}
/**
 * profile-update /api/auth/profile
 * @PUT
 */
export function authProfileUpdateApi() {
	return useMutation<
		AuthProfileUpdateApiResult,
		AuthProfileUpdateDto,
		AuthProfileUpdateApiError
	>("/auth/profile", async (url, body) => {
		const response = await fetch(`/api${url}`, {
			method: "PUT",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const result = await response.json();
		if (!response.ok) {
			throw result;
		}
		return result;
	});
}
interface AuthProfileUpdateApiResult {
	success: boolean;
	message: string;
}
interface AuthProfileUpdateApiError {
	success: boolean;
	message: string;
	body: keyof AuthProfileUpdateDto;
}
