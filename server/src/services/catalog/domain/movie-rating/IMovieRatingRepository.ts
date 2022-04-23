import { MovieRating } from './MovieRating';

export abstract class IMovieRatingRepository {
    public abstract save(entity: MovieRating): void;
}
