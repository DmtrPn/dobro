import { MovieData, MovieListResponse, MovieResponse, MovieCreateData, MovieUpdateData } from 'dobro-types/frontend';

import { axios } from '../lib/axios';

const MOVIE_URL = '/api/movie';

export class MovieApi {
    public static async getList(): Promise<MovieData[]> {
        const res = await axios.get<MovieListResponse>(MOVIE_URL);

        return res.data.movies;
    }

    public static async getById(id: string): Promise<MovieData> {
        const res = await axios.get<MovieResponse>(`${MOVIE_URL}/${id}`);

        return res.data.movie;
    }

    public static async create(movie: MovieCreateData): Promise<void> {
        await axios.post(MOVIE_URL, { movie });
    }

    public static async update(id: string, movie: MovieUpdateData): Promise<void> {
        await axios.put(`${MOVIE_URL}/${id}`, { movie });
    }

    public static async remove(id: string): Promise<void> {
        await axios.delete(`${MOVIE_URL}/${id}`);
    }
}
