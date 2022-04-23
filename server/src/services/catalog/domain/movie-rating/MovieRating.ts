import {
    MovieRatingCreateData,
    MovieRatingUpdateData,
    MovieRatingDTO,
} from './types';
import { InvalidRating } from './errors/InvalidRating';
import { SerializableEntity } from '@common/domain/SerializableEntity';

export class MovieRating extends SerializableEntity<MovieRatingCreateData, MovieRatingUpdateData, MovieRatingDTO> {

    private readonly movieId!: string;
    private readonly userId!: string;
    private rating!: number;

    public static newInstance(params: MovieRatingCreateData): MovieRating {
        return new MovieRating(params);
    }

    constructor(params: MovieRatingCreateData) {
        super(params);
    }

    public get dto(): MovieRatingDTO {
        return {
            movieId: this.movieId,
            userId: this.userId,
            rating: this.rating,
        }
    }

    public update({ rating }: MovieRatingUpdateData): void {
        this.checkRating(rating);
        this.rating = rating;

    }

    protected checkCreateParams({ rating }: MovieRatingCreateData) {
        this.checkRating(rating);
    }

    private checkRating(rating: number): void {
        if (rating < 0 || rating > 10) {
            throw new InvalidRating();
        }
    }
}
