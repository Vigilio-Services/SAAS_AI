import type { RequestVigilio } from "@config/server/const";
import { Validator } from "@libs/server/custom.decorator";
import Logger from "@libs/server/logger";
import {
    Body,
    Controller,
    Get,
    Injectable,
    NextFunction,
    Post,
    Put,
    Req,
    Status,
    UnauthorizedException,
} from "@vigilio/express-core";
import type { Request, Response } from "express";
import passport from "passport";
import {
    type AuthChangePasswordDto,
    type AuthChangePasswordProfileDto,
    type AuthForgotPasswordDto,
    type AuthLoginDto,
    type AuthProfileUpdateDto,
    authChangePasswordDto,
    authChangePasswordProfileDto,
    authForgotPasswordDto,
    authLoginDto,
    authProfileUpdateDto,
    type UserAuth,
} from "../dtos/auth.dto";
import { JWTAuth } from "../guards/auth.guard";
import { AuthService } from "../services/auth.service";

@Injectable()
@Controller("/auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @JWTAuth()
    @Get("/me")
    async me(@Req() req: RequestVigilio) {
        return { success: true, user: req.user };
    }

    @Post("/login", [
        (req: Request, res: Response, next: NextFunction) => {
            passport.authenticate(
                "local",
                (err: Error, user: UserAuth, message: { message: string }) => {
                    if (err) {
                        return next(err);
                    }
                    if (!user) {
                        return res
                            .status(401)
                            .json({ success: false, ...message });
                    }
                    req.logIn(user, (err) => {
                        if (err) {
                            return next(err);
                        }
                        return res.status(200).json({
                            success: true,
                            user,
                        });
                    });
                }
            )(req, res, next);
        },
    ])
    async login() {}

    // login para jwt mobile.
    @Validator(authLoginDto)
    @Post("/login-jwt")
    async loginJWT(@Body() body: AuthLoginDto) {
        const result = await this.authService.loginJWT(body);
        return result;
    }

    @Status(201)
    @Validator(authForgotPasswordDto)
    @Post("/forgot-password")
    async forgotPassword(
        @Req() req: RequestVigilio,
        @Body() body: AuthForgotPasswordDto
    ) {
        const result = await this.authService.forgotPassword(req, body);
        return result;
    }

    @Status(201)
    @Validator(authChangePasswordDto)
    @Post("/change-password")
    async changePassword(@Body() body: AuthChangePasswordDto) {
        const result = await this.authService.changePassword(body);
        return result;
    }

    @Validator(authChangePasswordProfileDto)
    @JWTAuth()
    @Post("/change-password-profile")
    async changePasswordProfile(
        @Req() req: RequestVigilio,
        @Body() body: AuthChangePasswordProfileDto
    ) {
        const result = await this.authService.changePasswordProfile(
            req.user,
            body
        );
        return result;
    }

    // esto es cuando usas jwt
    @Post("/refresh-token")
    async refreshToken(@Req() req: RequestVigilio) {
        const refresh_token = req.cookies.refresh_token;
        Logger.info({ refresh_token });
        if (!refresh_token) {
            throw new UnauthorizedException("No refresh token provided");
        }
        const result = await this.authService.refreshToken(refresh_token);
        return result;
    }

    @Validator(authProfileUpdateDto)
    @JWTAuth()
    @Put("/profile")
    async profileUpdate(
        @Req() req: RequestVigilio,
        @Body() body: AuthProfileUpdateDto
    ) {
        const result = await this.authService.profileUpdate(req.user, body);
        return result;
    }
}
