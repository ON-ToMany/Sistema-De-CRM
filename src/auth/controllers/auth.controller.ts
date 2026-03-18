import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "../services/auth.service";

@Controller("/auth")
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() user: any) {
        return this.authService.login(user);
    }
}