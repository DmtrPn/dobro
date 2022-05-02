import { Repository } from '@common/infrastructure/Repository';
import { FindCommand } from '@common/infrastructure/FindCommand';

import { MovieRating } from '@catalog/domain/movie-rating/MovieRating';
import { MovieRatingModel } from '@catalog/infrastructure/movie-rating/MovieRatingModel';
import { MovieRatingFindOptions } from '@catalog/domain/movie-rating/types';
import { IMovieRatingRepository } from '@catalog/domain/movie-rating/IMovieRatingRepository';
import { MovieRatingFindCommand } from '@catalog/infrastructure/movie-rating/MovieRatingFindCommand';

export class MovieRatingRepository
    extends Repository<MovieRating, MovieRatingModel, MovieRatingFindOptions>
    implements IMovieRatingRepository {

    protected create(model: MovieRatingModel): MovieRating {
        return MovieRating.newInstance(model);
    }

    protected createFindCommand(findOption: MovieRatingFindOptions): FindCommand<MovieRatingModel, MovieRatingFindOptions> {
        return new MovieRatingFindCommand(findOption);
    }

    protected modelFrom(movieRating: MovieRating): MovieRatingModel {
        return new MovieRatingModel(movieRating.dto);
    }

}