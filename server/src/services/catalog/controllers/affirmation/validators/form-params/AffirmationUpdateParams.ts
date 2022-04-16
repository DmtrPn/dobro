import { ApiProperty } from '@nestjs/swagger';
import { MinLength, IsString } from 'class-validator';

import { AffirmationUpdateData } from '@catalog/domain/affirmation/types';

export class AffirmationUpdateParams implements AffirmationUpdateData {

    @IsString()
    @MinLength(3)
    @ApiProperty()
    public text: string;

}
