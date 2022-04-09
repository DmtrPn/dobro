import { ApiResponseProperty, ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

import { MovieStatus } from 'dobro-types/enums';

export class MovieViewModel {

    @ApiResponseProperty()
    public id!: string;

    @ApiProperty({ enumName: 'MovieStatus' })
    public status!: MovieStatus;

    @ApiResponseProperty()
    public link: string;

    @ApiResponseProperty()
    public name: string;

    @ApiPropertyOptional()
    public description?: string;

    @ApiResponseProperty()
    public rating: number;

    @ApiResponseProperty()
    public authorId: string;

}
