import { MovieData, MovieListResponse, MovieCreateData, MovieUpdateData } from 'dobro-types/frontend';

import { axios } from '../lib/axios';

const DREAM_URL = '/api/movie';

export class MovieApi {

    public static async getList(): Promise<MovieData[]> {
        const res = await axios.get<MovieListResponse>(DREAM_URL);

        return res.data.movies;
    }

    public static async create(movie: MovieCreateData): Promise<void> {
        await axios.post(DREAM_URL, { movie });
    }

    public static async update(id: string, movie: MovieUpdateData): Promise<void> {
        await axios.put(`${DREAM_URL}/${id}`, { movie });
    }

    public static async remove(id: string): Promise<void> {
        await axios.delete(`${DREAM_URL}/${id}`);
    }

}
