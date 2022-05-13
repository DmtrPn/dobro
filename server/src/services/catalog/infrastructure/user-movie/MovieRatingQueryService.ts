import { QueryService } from '@common/infrastructure/QueryService';

import { IMovieRatingQueryService } from '@catalog/domain/movie-rating/IMovieRatingQueryService';
import { UserMovieFindOptions } from '@catalog/domain/movie-rating/types';

import { UserMovieModel } from './UserMovieModel';
import { MovieRatingFindCommand } from './MovieRatingFindCommand';

export class MovieRatingQueryService
    extends QueryService<UserMovieModel, UserMovieFindOptions>
    implements IMovieRatingQueryService {

    protected modelClass = UserMovieModel;
    protected findCommand = MovieRatingFindCommand;

}
