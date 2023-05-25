import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

import { IS_PUBLIC } from '../decorators/is-public.decorator';
  
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
	constructor(private reflector: Reflector) {
		super();
	}

	canActivate(context: ExecutionContext): Promise<boolean> | boolean {
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [
			context.getHandler(),
			context.getClass(),
		]);

		if (isPublic) {
			return true;
		}

		const canActivate = super.canActivate(context);

		if (typeof canActivate === 'boolean') {
			return canActivate;
		}

		const canActivatePromise = canActivate as Promise<boolean>;

		return canActivatePromise.catch((error) => {
			throw new UnauthorizedException(error.message);
		});
	}
}