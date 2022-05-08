import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Optional } from 'dobro-types/common';
import { AuthUserData } from 'dobro-types/backend';

import { ACTION_KEY, ActionMetadata } from '@components/decorators/Action';
import { IS_PUBLIC_KEY, IsPublicMetadata } from '@components/decorators/Pubic';
import { AccessControl } from '@core/access-control/AccessControl';
import { ForbiddenError } from '@core/http-error';

@Injectable()
export class AccessControlGuard implements CanActivate {

    private accessControl = AccessControl.getInstance();
    private reflector = new Reflector();

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<IsPublicMetadata>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        const action = this.reflector.getAllAndOverride<ActionMetadata>(ACTION_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) {
            return true;
        }

        if (!action) {
            throw new ForbiddenError('Action does not set');
        }

        const user = this.getUser(context);

        return !!user && this.accessControl.can({
            userRoles: [],
            ...action,
        });
    }

    private getUser(ctx: ExecutionContext): Optional<AuthUserData> {
        const request = ctx.switchToHttp().getRequest();

        return request.session.passport?.user;
    }
}