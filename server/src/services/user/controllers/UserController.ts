import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';

// import { Public } from '@components/decorators/Pubic';

import { IUserCrudService } from '@user/domain/user/IUserCrudService';
import { UserListResponse } from './responces';
import { Inject } from 'typescript-ioc';

@ApiTags('Пользователя')
@Controller('user')
export class UserController {

    @Inject private crudService: IUserCrudService;

    @ApiOkResponse({ type: UserListResponse })
    @Get('/')
    public async find(): Promise<UserListResponse> {
        const users = await this.crudService.find();
        return { users };
    }

}
