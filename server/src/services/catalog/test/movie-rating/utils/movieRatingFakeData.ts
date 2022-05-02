import { Attributes } from 'dobro-types/common';

import { MovieRatingModel } from '@catalog/infrastructure/movie-rating/MovieRatingModel';
import { FakeParams } from '@core/test/FakeParams';
import { MovieRatingUpdateData } from '@catalog/domain/movie-rating/types';

export const getFakeMovieRatingCreationParams = (): Attributes<MovieRatingModel> => {
    return {
        movieId: FakeParams.getId(),
        userId: FakeParams.getId(),
        rating: FakeParams.getInteger({ min: 0, max: 10 }),
    };
};

export const getFakeMovieRatingUpdateParams = (): MovieRatingUpdateData => {
    return {
        rating: FakeParams.getInteger({ min: 0, max: 10 }),
    };
};