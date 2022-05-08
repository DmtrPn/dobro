import { ApiProperty } from '@nestjs/swagger';

import { UserStatus } from '@common/enums';
import { RoleName } from '@core/access-control/types';

export class UserViewModel {

    @ApiProperty()
    public id: string;

    @ApiProperty({ enum: UserStatus, enumName: 'UserStatus' })
    public status: UserStatus;

    @ApiProperty({ enum: RoleName, enumName: 'RoleName', isArray: true })
    public roles: RoleName[];

    @ApiProperty()
    public name: string;

    @ApiProperty()
    public email: string;

}
