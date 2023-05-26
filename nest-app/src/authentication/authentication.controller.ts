import { Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthenticationRequest } from './models/authenticationRequest';
import { IsPublic } from './decorators/is-public.decorator';

@Controller()
export class AuthenticationController {
	constructor(private readonly authService: AuthenticationService){}

	@IsPublic()
	@Post("login")
	@HttpCode(HttpStatus.OK)
	@UseGuards(LocalAuthGuard)
	login(@Request() req: AuthenticationRequest){
		return this.authService.login(req.user);
	}
}
