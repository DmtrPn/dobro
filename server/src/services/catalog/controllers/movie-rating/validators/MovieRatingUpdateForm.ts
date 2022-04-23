import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { MovieRatingUpdateParams } from './form-params/MovieRatingUpdateParams';

export class MovieRatingUpdateForm {

    @ApiProperty()
    @ValidateNested()
    @Type(() => MovieRatingUpdateParams)
    public movieRating!: MovieRatingUpdateParams;

}
