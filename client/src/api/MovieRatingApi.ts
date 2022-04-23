import { MovieRatingUpdateParams } from 'dobro-types/frontend';

import { axios } from '../lib/axios';

const MOVIE_RATING_URL = '/api/movie-rating';

export class MovieRatingApi {

    public static async update(movieRating: MovieRatingUpdateParams): Promise<void> {
        await axios.put(MOVIE_RATING_URL, { movieRating });
    }

}
