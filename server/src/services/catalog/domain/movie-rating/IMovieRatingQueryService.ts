import { TransactionManager } from '@common/infrastructure/TransactionManager';
import { MovieRatingModel } from '@catalog/infrastructure/movie-rating/MovieRatingModel';
import { MovieRatingFindOptions, MovieRatingUpdateData, MovieRatingCreateData } from '@catalog/domain/movie-rating/types';

export abstract class IMovieRatingRatingCrudService extends TransactionManager {
    public abstract find(options: MovieRatingFindOptions): Promise<MovieRatingModel[]>;
    public abstract create(params: MovieRatingCreateData): void;
    public abstract update(id: string, params: MovieRatingUpdateData): void;
}
