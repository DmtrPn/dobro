import '@core/test/unitTestRanner';
import { expectError } from '@core/test/expectError';

import { MovieRating } from '@catalog/domain/movie-rating/MovieRating';
import { InvalidRating } from '@catalog/domain/movie-rating/errors/InvalidRating';

import {
    getFakeMovieRatingCreationParams,
    getFakeMovieRatingUpdateParams,
} from '../utils/movieRatingFakeData';

@Describe()
export class MovieRatingDomainTest {

    @Test()
    public createMovieRating(): void {
        const data = getFakeMovieRatingCreationParams();
        const movieRating = new MovieRating(data);

        expect(movieRating).toBeInstanceOf(MovieRating);
        expect(movieRating.dto).toEqual(data);
    }

    @Test()
    @expectError(InvalidRating)
    public createMovieRatingWithNotValidMinRating(): void {
        const { rating, ...data } = getFakeMovieRatingCreationParams();
        new MovieRating({ rating: -1, ...data })
    }

    @Test()
    @expectError(InvalidRating)
    public createMovieRatingWithNotValidMaxRating(): void {
        const { rating, ...data } = getFakeMovieRatingCreationParams();
        new MovieRating({ rating: 11, ...data })
    }

    @Test()
    public updateMovieRating(): void {
        const movieRating = new MovieRating(getFakeMovieRatingCreationParams());
        const updateData = getFakeMovieRatingUpdateParams();

        movieRating.update(updateData);

        expect(movieRating.dto.rating).toEqual(updateData.rating);
    }

    @Test()
    @expectError(InvalidRating)
    public updateMovieRatingWithNotValidMinRating(): void {
        const movieRating = new MovieRating(getFakeMovieRatingCreationParams());

        movieRating.update({ rating: -1 });
    }

    @Test()
    @expectError(InvalidRating)
    public updateMovieRatingWithNotValidMaxRating(): void {
        const movieRating = new MovieRating(getFakeMovieRatingCreationParams());

        movieRating.update({ rating: 11 });
    }

}
