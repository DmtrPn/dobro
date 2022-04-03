import { MovieController } from '../../controllers/MovieController';

import { DbConnector } from '@core/db-connector';

describe('MovieController', () => {
    let movieController: MovieController;
    let dbConnector = DbConnector.getInstance();

    beforeAll(async () => {
        await dbConnector.initialize();
    })

    afterAll(async () => {
        await dbConnector.closeConnection();
    })

    beforeEach(() => {
        movieController = new MovieController();
    });

    describe('findAll', () => {
        it('should return an array of movies', async () => {
            const result = [];
            const cats = await movieController.find();

            expect(cats.length).toBe(result.length);
        });
    });
});