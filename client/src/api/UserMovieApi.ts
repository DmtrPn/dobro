import { UserMovieUpdateParams, UserMoviesResponse, UserMovieData, UserMovieUpdateForm } from 'dobro-types/frontend';

import { axios } from '../lib/axios';

const MOVIE_RATING_URL = '/api/user-movie';

export class UserMovieApi {
    public static async update(userMovie: UserMovieUpdateParams): Promise<void> {
        await axios.put<void, void, UserMovieUpdateForm>(MOVIE_RATING_URL, { userMovie });
    }

    public static async getUserMovies(userId: string): Promise<UserMovieData[]> {
        const res = await axios.get<UserMoviesResponse>(`${MOVIE_RATING_URL}/${userId}`);

        return res.data.userMovies;
    }
}
