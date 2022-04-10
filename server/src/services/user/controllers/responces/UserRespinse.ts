import { ApiResponseProperty } from '@nestjs/swagger';

import { UserViewModel } from './view-model';

export class UserResponse {

    @ApiResponseProperty({ type: UserViewModel })
    public user: UserViewModel;

}
