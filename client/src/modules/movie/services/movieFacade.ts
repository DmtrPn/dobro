import { movieService } from './movieService';

class MovieFacade {
    public async load(): Promise<void> {
        await movieService.load();
    }
}

export const movieFacade = new MovieFacade();
