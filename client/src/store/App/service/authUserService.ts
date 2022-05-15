import { UserMovieApi } from '@api/UserMovieApi';

import { store } from '@store';

class AuthUserService {

    public async loadUserMovies(): Promise<void> {
        const { appStore: { isAuthorized, authUser } } = store;

        if (isAuthorized && authUser?.movies.getSize() === 0) {
            const userMovies = await UserMovieApi.getUserMovies(authUser!.id);

            authUser.setMovies(userMovies);
        }
    }

}

export const authUserService = new AuthUserService();
