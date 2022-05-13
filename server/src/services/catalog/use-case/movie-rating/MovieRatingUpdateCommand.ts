import { Inject } from 'typescript-ioc';

import { UseCaseCommand } from '@common/use-cases/UseCaseCommand';
import { UserMovieCreateData } from '@catalog/domain/movie-rating/types';
import { IMovieRatingRepository } from '@catalog/domain/movie-rating/IMovieRatingRepository';
import { UserMovie } from '@catalog/domain/movie-rating/UserMovie';

interface Params extends UserMovieCreateData {}

export class MovieRatingUpdateCommand extends UseCaseCommand<Params> {

    @Inject protected repository: IMovieRatingRepository;

    public async execute(): Promise<void> {
        const movieRating = UserMovie.newInstance(this.params);

        await this.repository.save(movieRating);
    }

}
