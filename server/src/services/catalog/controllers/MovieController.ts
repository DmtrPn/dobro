import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { Inject } from 'typescript-ioc';

import { Public } from '@components/decorators/Pubic';

import { MovieListResponse } from './responces';
import { IMovieCrudService } from '@services/catalog/domain/movie/IMovieCrudService';

@ApiTags('Фильмы')
@Controller('catalog/movie')
export class MovieController {

    @Inject
    private movieCrudService: IMovieCrudService;

    @Public()
    @ApiOkResponse({ type: MovieListResponse })
    @Get('/')
    public async find(): Promise<MovieListResponse> {
        const movies = await this.movieCrudService.find();
        return { movies };
    }

}
