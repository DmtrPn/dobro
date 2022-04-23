import { Class } from 'dobro-types/common';

import { FindCommand } from '@common/infrastructure/FindCommand';
import { QueryService } from '@common/infrastructure/QueryService';

import { IMovieRatingQueryService } from '@catalog/domain/movie-rating/IMovieRatingQueryService';
import { MovieRatingFindOptions } from '@catalog/domain/movie-rating/types';

import { MovieRatingModel } from './MovieRatingModel';
import { MovieRatingFindCommand } from './MovieRatingFindCommand';

export class MovieRatingQueryService
    extends QueryService<MovieRatingModel, MovieRatingFindOptions>
    implements IMovieRatingQueryService {

    protected modelClass = MovieRatingModel;
    protected findCommand: Class<FindCommand<MovieRatingModel, MovieRatingFindOptions>, any> = MovieRatingFindCommand;

}
