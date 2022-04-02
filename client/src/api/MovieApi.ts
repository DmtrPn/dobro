import { MovieData, MovieListResponse } from 'dobro-types/frontend';

import { axios } from '../lib/axios';

const DREAM_URL = '/api/movie';

export class DreamApi {
    public static async getList(): Promise<MovieData[]> {
        const res = await axios.get<MovieListResponse>(`${DREAM_URL}`);

        return res.data.movies;
    }
}
