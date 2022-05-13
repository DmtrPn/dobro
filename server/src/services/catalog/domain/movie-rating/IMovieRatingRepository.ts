import { UserMovie } from './UserMovie';

export abstract class IMovieRatingRepository {
    public abstract save(entity: UserMovie): void;
}
