import { MovieModel } from '@catalog/infrastructure/movie/MovieModel';
import { MovieFindOptions } from '@catalog/domain/movie/types';
import { IQueryService } from '@common/infrastructure/QueryService';

import { MovieData } from './types';

export abstract class IMovieQueryService implements IQueryService<MovieModel, MovieFindOptions, MovieData> {
    public abstract find(options: MovieFindOptions): Promise<MovieData[]>;
}
