import {
    UserMovieCreateData,
    UserMovieUpdateData,
    UserMovieDTO,
} from './types';
import { InvalidRating } from './errors/InvalidRating';
import { SerializableEntity } from '@common/domain/SerializableEntity';

export class UserMovie extends SerializableEntity<UserMovieCreateData, UserMovieUpdateData, UserMovieDTO> {

    public static newInstance(params: UserMovieCreateData): UserMovie {
        return new UserMovie(params);
    }

    private readonly movieId!: string;
    private readonly userId!: string;
    private rating!: number;

    public get dto(): UserMovieDTO {
        return {
            movieId: this.movieId,
            userId: this.userId,
            rating: this.rating,
            // TODO Сделай нормально!
            isViewed: true,
        };
    }

    public update({ rating }: UserMovieUpdateData): void {
        this.checkRating(rating);
        this.rating = rating;

    }

    protected checkCreateParams({ rating }: UserMovieCreateData) {
        this.checkRating(rating);
    }

    private checkRating(rating: number): void {
        if (rating < 0 || rating > 10) {
            throw new InvalidRating();
        }
    }
}
