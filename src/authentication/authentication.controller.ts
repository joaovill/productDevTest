import { Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LocalAuthGuard } from './guards/local.auth.guard';

@Controller()
export class AuthenticationController {
    constructor(private readonly authService: AuthenticationService){}

    @Post("login")
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    login(){
        this.authService.login();
    }
}
