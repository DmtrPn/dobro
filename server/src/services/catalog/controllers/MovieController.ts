import { Controller, Get } from '@nestjs/common';

import { MovieCrudService } from '@services/catalog/infrastructure/movie/MovieCrudService';
import { MovieModel } from '@services/catalog/infrastructure/movie/MovieModel';

@Controller('catalog/movie')
export class MovieController {

    private movieCrudService = new MovieCrudService();

    @Get('/')
    public async find(): Promise<MovieModel[]> {
        return await this.movieCrudService.find();
    }

}
