import { MovieCreateData, MovieUpdateData } from 'dobro-types/frontend';
import { MovieStatus } from 'dobro-types/enums';

import { MovieApi } from '@api/MovieApi';
import { store } from '@store';
import { isDefined } from '@utils/isDefined';
import { getId } from '@utils/getId';

class MovieService {

    public async load(): Promise<void> {
        const { movieStore } = store;

        if (!movieStore.movieList.isDataSet) {
            const movies = await MovieApi.getList();

            movieStore.movieList.set(movies);
        }
    }

    public async create(createParams: Omit<MovieCreateData, 'id'>): Promise<void> {
        const { movieStore: { movieList }, appStore: { authUserId } } = store;

        if (isDefined(authUserId)) {
            const id = getId();
            await MovieApi.create({ id, ...createParams });

            movieList.add([{
                id,
                authorId: authUserId,
                status: MovieStatus.New,
                rating: 0,
                ...createParams,
            }]);
        }
    }

    public async update(id: string, updateParams: MovieUpdateData): Promise<void> {
        const { movieStore: { movieList }, appStore: { authUserId } } = store;

        if (isDefined(authUserId)) {
            await MovieApi.update(id, updateParams);

            movieList.update(id, updateParams);
        }
    }

    public async remove(id: string): Promise<void> {
        const { movieStore: { movieList }, appStore: { authUserId } } = store;

        if (isDefined(authUserId)) {
            await MovieApi.remove(id);

            movieList.remove(id);
        }
    }

    public async reloadMovie(movieId: string): Promise<void> {
        const { movieStore: { movieList } } = store;
        const movieData = await MovieApi.getById(movieId);

        const movie = movieList.get(movieId);
        movie.update(movieData);
    }
}

export const movieService = new MovieService();
