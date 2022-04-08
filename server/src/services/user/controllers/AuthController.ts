import { Controller, Post, Put, Req, Res, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { Inject } from 'typescript-ioc';

import { LoginForm } from 'dobro-types/backend';

import { Public } from '@components/decorators';
import { LoginUserCommand } from '@user/use-cases/auth';
import { IUserCrudService } from '@user/domain/user/IUserCrudService';

import { UserListResponse } from './responces';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

    @Inject private userCrudService: IUserCrudService;

    @Public()
    @ApiOkResponse({ type: UserListResponse })
    @Post('/login')
    public async find(
        @Req() request,
        @Res() response,
        @Body() { user: loginData }: LoginForm,
    ) {
        await new LoginUserCommand(loginData).execute();

        const user = await this.userCrudService.getByEmail(loginData.email);

        request.login(user, (err, req) => {
            err
                ? response.status(401).send('<h1>Login Failure</h1>')
                : response.status(200).send();
        });
    }

    @Public()
    @ApiOkResponse({ type: UserListResponse })
    @Put('/logout')
    public async logout(
        @Req() req,
        @Res() res,
    ) {
        req.session.destroy();
        req.logout();
        res.redirect('/login');
    }

}
