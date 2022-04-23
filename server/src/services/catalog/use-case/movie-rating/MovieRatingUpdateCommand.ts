import { Inject } from 'typescript-ioc';

import { UseCaseCommand } from '@common/use-cases/UseCaseCommand';
import { MovieRatingCreateData } from '@catalog/domain/movie-rating/types';
import { IMovieRatingRepository } from '@catalog/domain/movie-rating/IMovieRatingRepository';
import { MovieRating } from '@catalog/domain/movie-rating/MovieRating';

interface Params extends MovieRatingCreateData {}

export class MovieRatingUpdateCommand extends UseCaseCommand<Params> {

    @Inject protected repository: IMovieRatingRepository;

    public async execute(): Promise<void> {
        const movieRating = MovieRating.newInstance(this.params);

        await this.repository.save(movieRating);
    }

}
