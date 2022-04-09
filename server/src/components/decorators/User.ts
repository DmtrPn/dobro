import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { Optional } from 'dobro-types/common';
import { AuthUserData } from 'dobro-types/backend';

export const User = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): Optional<AuthUserData> => {
        const request = ctx.switchToHttp().getRequest();

        return request.session.passport?.user;
    },
);
