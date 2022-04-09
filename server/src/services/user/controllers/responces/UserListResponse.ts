import { ApiResponseProperty } from '@nestjs/swagger';

import { UserViewModel } from './view-model';

export class UserListResponse {

    @ApiResponseProperty({ type: [UserViewModel] })
    public users: UserViewModel[];

}
