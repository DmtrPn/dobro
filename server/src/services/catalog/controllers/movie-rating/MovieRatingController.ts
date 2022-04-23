import { Controller, Put, Param, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';


import { Uuid } from '@common/controllers/validators/Uuid';
import { MovieRatingUpdateCommand } from '@catalog/use-case/movie-rating/MovieRatingUpdateCommand';

import { MovieRatingUpdateForm } from './validators/MovieRatingUpdateForm';

@ApiTags('Рейтинг фильмы')
@Controller('movie-rating')
export class MovieRatingController {

    @Put('/')
    public async update(
        @Param() { id }: Uuid,
        @Body() { movieRating }: MovieRatingUpdateForm,
    ): Promise<void> {
        const command = new MovieRatingUpdateCommand(movieRating);

        await command.execute();
    }

}
