import { Controller, Put, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { MovieRatingUpdateCommand } from '@catalog/use-case/movie-rating/MovieRatingUpdateCommand';

import { UserMovieUpdateForm } from './validators/UserMovieUpdateForm';
import { Action } from '@components/decorators/Action';
import { ActionType, EntityName } from '@core/access-control/types';

@ApiTags('Рейтинг фильмы')
@Controller('movie-rating')
export class UserMovieController {

    @Action(EntityName.MovieRating, ActionType.Edit)
    @Put('/')
    public async update(
        @Body() { movieRating }: UserMovieUpdateForm,
    ): Promise<void> {
        const command = new MovieRatingUpdateCommand(movieRating);

        await command.execute();
    }

}
