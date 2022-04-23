import { assignParams } from '@utils/assignParams';

import {
    MovieRatingCreateData,
    MovieRatingUpdateData,
    MovieRatingDTO,
} from './types';
import { InvalidRating } from './errors/InvalidRating';

export class MovieRating {

    private readonly movieId!: string;
    private readonly userId!: string;
    private rating!: number;

    constructor(params: MovieRatingCreateData) {
        this.checkRating(params.rating);
        assignParams<MovieRatingCreateData>(this as unknown as MovieRatingCreateData, params);
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

    private checkRating(rating: number): void {
        if (rating < 0 || rating > 10) {
            throw new InvalidRating();
        }
    }
}
