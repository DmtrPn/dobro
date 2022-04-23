import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min, Max, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';

import { MovieRatingCreateData } from '@catalog/domain/movie-rating/types';

export class MovieRatingUpdateParams implements MovieRatingCreateData {

    @IsUUID()
    @ApiProperty()
    public movieId: string;

    @IsUUID()
    @ApiProperty()
    public userId: string;

    @IsInt()
    @Min(0)
    @Max(10)
    @Transform(({ value }) => Number(value))
    @ApiProperty()
    public rating: number;

}
