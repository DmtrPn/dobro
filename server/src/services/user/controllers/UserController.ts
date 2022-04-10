import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';

// import { Public } from '@components/decorators/Pubic';

// import { MovieCrudService } from '@catalog/infrastructure/movie/MovieCrudService';
import { UserListResponse } from './responces';

@ApiTags('Пользователя')
@Controller('user')
export class UserController {

    // private movieCrudService = new MovieCrudService();

    @ApiOkResponse({ type: UserListResponse })
    @Get('/')
    public async find(): Promise<UserListResponse> {
        const users = [];
        return { users };
    }

}
