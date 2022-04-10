import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, Min, Max, IsString, IsEnum, IsOptional } from 'class-validator';

import { MovieUpdateData } from '@catalog/domain/movie/types';
import { MovieStatus } from 'dobro-types/enums';

export class MovieUpdateParams implements MovieUpdateData {

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    public name?: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    public link?: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    public description?: string;

    @IsEnum(MovieStatus)
    @IsOptional()
    @ApiPropertyOptional()
    public status?: MovieStatus;

    @IsInt()
    @Min(0)
    @Max(10)
    @IsOptional()
    @ApiPropertyOptional()
    public rating?: number;

}
