import { TransactionManager } from '@common/infrastructure/TransactionManager';
import { Attributes } from 'dobro-types/common';

import { MovieModel } from './MovieModel';
import { IMovieCrudService } from '@services/catalog/domain/movie/IMovieCrudService';

export class MovieCrudService extends TransactionManager implements IMovieCrudService {

    public async find(): Promise<MovieModel[]> {
        return this.manager.find<MovieModel>(MovieModel)
    }

    public async getById(id: string): Promise<MovieModel> {
        return this.manager.findOneBy<MovieModel>(MovieModel, { id })
    }

    public async create(params: Attributes<MovieModel>): Promise<void> {
        await this.manager.transaction(entityManager =>
            entityManager
                .createQueryBuilder()
                .insert()
                .into(MovieModel)
                .values(params)
                .execute()
        );
    }

    public async update(id: string, params: Attributes<MovieModel>): Promise<void> {
        await this.manager.transaction(entityManager =>
            entityManager
                .createQueryBuilder()
                .update(MovieModel)
                .set(params)
                .where({ id })
                .execute()
        );
    }

    public async remove(id: string): Promise<void> {
        await this.manager.delete(MovieModel, { id });
    }

}
