import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { Optional } from 'dobro-types/common';
import { AuthUserViewModel } from 'dobro-types/backend';

export const User = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): Optional<AuthUserViewModel> => {
        const request = ctx.switchToHttp().getRequest();

        return request.session.passport?.user;
    },
);
