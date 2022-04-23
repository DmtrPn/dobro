import { Controller, Put, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';


import { MovieRatingUpdateCommand } from '@catalog/use-case/movie-rating/MovieRatingUpdateCommand';

import { MovieRatingUpdateForm } from './validators/MovieRatingUpdateForm';

@ApiTags('Рейтинг фильмы')
@Controller('movie-rating')
export class MovieRatingController {

    @Put('/')
    public async update(
        @Body() { movieRating }: MovieRatingUpdateForm,
    ): Promise<void> {
        const command = new MovieRatingUpdateCommand(movieRating);

        await command.execute();
    }

}
