import { ApiProperty } from '@nestjs/swagger';

import { UserStatus } from '@common/enums';

export class UserViewModel {

    @ApiProperty()
    public id: string;

    @ApiProperty({ enum: UserStatus, enumName: 'UserStatus' })
    public status: UserStatus;

    @ApiProperty()
    public name: string;

    @ApiProperty()
    public email: string;

}
