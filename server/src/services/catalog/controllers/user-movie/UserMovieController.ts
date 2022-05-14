import { Controller, Put, Body } from '@nestjs/common';
import { ApiTags, ApiExtraModels } from '@nestjs/swagger';

import { MovieRatingUpdateCommand } from '@catalog/use-case/movie-rating/MovieRatingUpdateCommand';
import { Action } from '@components/decorators/Action';
import { ActionType, EntityName } from '@core/access-control/types';

import { UserMovieModel } from './responces/view-model/UserMovieModel';
import { UserMovieUpdateForm } from './validators/UserMovieUpdateForm';

@ApiTags('Фильмы пользователя')
@ApiExtraModels(UserMovieModel)
@Controller('user-movie')
export class UserMovieController {

    @Action(EntityName.UserMovie, ActionType.Edit)
    @Put('/')
    public async update(
        @Body() { userMovie }: UserMovieUpdateForm,
    ): Promise<void> {
        const command = new MovieRatingUpdateCommand(userMovie);

        await command.execute();
    }

}
