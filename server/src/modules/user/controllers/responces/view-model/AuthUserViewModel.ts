import { ApiProperty } from '@nestjs/swagger';

export class AuthUserViewModel {

    @ApiProperty()
    public id: string;

    @ApiProperty()
    public name: string;

    @ApiProperty()
    public email: string;

}
