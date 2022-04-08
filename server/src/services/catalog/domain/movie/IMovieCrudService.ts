import { Attributes } from 'dobro-types/common';

import { TransactionManager } from '@common/infrastructure/TransactionManager';
import { MovieModel } from '@services/catalog/infrastructure/movie/MovieModel';

export abstract class IMovieCrudService extends TransactionManager {
    public abstract find(): Promise<MovieModel[]>;
    public abstract getById(id: string): Promise<MovieModel>;
    public abstract create(params: Attributes<MovieModel>): void;
    public abstract update(id: string, params: Attributes<MovieModel>): void;
    public abstract remove(id: string): void;

}
