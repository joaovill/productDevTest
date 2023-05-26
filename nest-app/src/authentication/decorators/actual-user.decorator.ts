import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { AuthenticationRequest } from "../models/authenticationRequest";

export const ActualUser = createParamDecorator(
	(data: unknown, context: ExecutionContext) => {
		const request = context.switchToHttp().getRequest<AuthenticationRequest>()
		return request.user
	}
)