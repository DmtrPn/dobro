import '@core/test/testRunner';

import { MovieController } from '@catalog/controllers';
import { MovieCrudService } from '@catalog/infrastructure/movie/MovieCrudService';

import { getFakeMovieCreationParams } from '../utils/movieFakeData';

describe('MovieController', () => {
    let movieController: MovieController;

    const movieCrudService = new MovieCrudService();

    beforeEach(() => {
        movieController = new MovieController();
    });

    describe('findAll', () => {
        test('should return an array of movies', async () => {
            const result = [];
            const { movies } = await movieController.find();

            expect(movies.length).toEqual(result.length);
        });
    });

    describe('create ', () => {
        test('create sucsess', async () => {
            const movie = getFakeMovieCreationParams();
            await movieCrudService.create(movie);
            const created = await movieCrudService.getById(movie.id);

            expect(movie).toEqual(created);
        });
    });
});