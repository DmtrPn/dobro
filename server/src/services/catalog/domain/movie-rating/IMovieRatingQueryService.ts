import { MovieRatingModel } from '@catalog/infrastructure/movie-rating/MovieRatingModel';
import { MovieRatingFindOptions } from '@catalog/domain/movie-rating/types';

export abstract class IMovieRatingQueryService {
    public abstract find(options: MovieRatingFindOptions): Promise<MovieRatingModel[]>;
}
