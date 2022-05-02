import { FindCommand } from '@common/infrastructure/FindCommand';
import { MovieRatingModel } from '@catalog/infrastructure/movie-rating/MovieRatingModel';
import { MovieRatingFindOptions } from '@catalog/domain/movie-rating/types';

export class MovieRatingFindCommand extends FindCommand<MovieRatingModel, MovieRatingFindOptions> {

    private movieId?: MovieRatingFindOptions['movieId'];
    private userId?: MovieRatingFindOptions['userId'];

    constructor(options: MovieRatingFindOptions) {
        super(options, MovieRatingModel);
    }

    protected addFilters(): this {
        return this
            .filterBy('movieId', this.movieId)
            .filterBy('userId', this.userId);
    }
}
