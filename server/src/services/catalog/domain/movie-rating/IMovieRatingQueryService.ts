import { UserMovieModel } from '@catalog/infrastructure/user-movie/UserMovieModel';
import { UserMovieFindOptions } from '@catalog/domain/movie-rating/types';

export abstract class IMovieRatingQueryService {
    public abstract find(options: UserMovieFindOptions): Promise<UserMovieModel[]>;
}
