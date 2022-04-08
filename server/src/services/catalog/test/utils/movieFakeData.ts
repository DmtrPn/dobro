import { Attributes } from 'dobro-types/common';

import { MovieModel } from '@catalog/infrastructure/movie/MovieModel';
import { FakeParams } from '@core/test/FakeParams';
import { MovieStatus } from 'dobro-types/enums';

export const getFakeMovieCreationParams = (): Attributes<MovieModel> => {
    return {
        id: FakeParams.getId(),
        link: FakeParams.getUrl(),
        name: FakeParams.getName(),
        description: FakeParams.getTest(),
        authorId: FakeParams.getId(),
        status: MovieStatus.New,
        rating: FakeParams.getInteger(),
    }
}