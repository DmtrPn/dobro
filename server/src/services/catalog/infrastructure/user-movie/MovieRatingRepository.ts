import { Repository } from '@common/infrastructure/Repository';
import { FindCommand } from '@common/infrastructure/FindCommand';

import { UserMovie } from '@catalog/domain/movie-rating/UserMovie';
import { UserMovieModel } from '@catalog/infrastructure/user-movie/UserMovieModel';
import { UserMovieFindOptions } from '@catalog/domain/movie-rating/types';
import { IMovieRatingRepository } from '@catalog/domain/movie-rating/IMovieRatingRepository';
import { MovieRatingFindCommand } from '@catalog/infrastructure/user-movie/MovieRatingFindCommand';

export class MovieRatingRepository
    extends Repository<UserMovie, UserMovieModel, UserMovieFindOptions>
    implements IMovieRatingRepository {

    protected create(model: UserMovieModel): UserMovie {
        return UserMovie.newInstance(model);
    }

    protected createFindCommand(findOption: UserMovieFindOptions): FindCommand<UserMovieModel, UserMovieFindOptions> {
        return new MovieRatingFindCommand(findOption);
    }

    protected modelFrom(movieRating: UserMovie): UserMovieModel {
        return new UserMovieModel(movieRating.dto);
    }

}