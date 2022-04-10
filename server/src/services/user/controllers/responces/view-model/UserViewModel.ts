import { ApiResponseProperty, ApiProperty } from '@nestjs/swagger';

import { UserStatus } from 'dobro-types/enums';

export class UserViewModel {

    @ApiResponseProperty()
    public id!: string;

    @ApiProperty({ enumName: 'UserStatus' })
    public status!: UserStatus;

    @ApiResponseProperty()
    public name: string;

    @ApiResponseProperty()
    public email: string;

}
