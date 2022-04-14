import { ApiResponseProperty } from '@nestjs/swagger';

import { UserViewModel } from './view-model';

export class UserResponse {

    @ApiResponseProperty()
    public user: UserViewModel;

}
