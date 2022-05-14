import { UserMovieUpdateParams, UserMovieUpdateForm } from 'dobro-types/frontend';

import { axios } from '../lib/axios';

const MOVIE_RATING_URL = '/api/user-movie';

export class UserMovieApi {

    public static async update(userMovie: UserMovieUpdateParams): Promise<void> {
        await axios.put<void, void, UserMovieUpdateForm>(MOVIE_RATING_URL, { userMovie });
    }

}
