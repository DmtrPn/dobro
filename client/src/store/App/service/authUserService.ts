import { UserMovieUpdateParams } from 'dobro-types/frontend';

import { UserMovieApi } from '@api/UserMovieApi';

import { store } from '@store';
import { movieService } from '@movie/services/movieService';

class AuthUserService {

    public async loadUserMovies(): Promise<void> {
        const { appStore: { isAuthorized, authUser } } = store;

        if (isAuthorized && authUser?.movies.getSize() === 0) {
            const userMovies = await UserMovieApi.getUserMovies(authUser!.id);

            authUser.setMovies(userMovies);
        }
    }

    public async updateMovie(params: Omit<UserMovieUpdateParams, 'userId'>): Promise<void> {
        const { appStore: { authUserId, authUser } } = store;
        const movieRating = {
            userId: authUserId!,
            ...params,
        };
        await UserMovieApi.update(movieRating);
        await movieService.reloadMovie(params.movieId);

        authUser!.updateMovie(params);
    }

}

export const authUserService = new AuthUserService();
