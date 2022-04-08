import { TransactionManager } from '@common/infrastructure/TransactionManager';
import { Attributes, Optional } from 'dobro-types/common';

import { UserModel } from './UserModel';

export class UserCrudService extends TransactionManager {

    public async find(): Promise<UserModel[]> {
        return this.manager.find<UserModel>(UserModel)
    }

    public async getById(id: string): Promise<UserModel> {
        return this.manager.findOneBy<UserModel>(UserModel, { id })
    }

    public async getByEmail(email: string): Promise<Optional<UserModel>> {
        return this.manager.findOneBy<UserModel>(UserModel, { email })
    }

    public async create(params: Attributes<UserModel>): Promise<void> {
        await this.manager.transaction(entityManager =>
            entityManager
                .createQueryBuilder()
                .insert()
                .into(UserModel)
                .values(params)
                .execute()
        );
    }

    public async update(id: string, params: Attributes<UserModel>): Promise<void> {
        await this.manager.transaction(entityManager =>
            entityManager
                .createQueryBuilder()
                .update(UserModel)
                .set(params)
                .where({ id })
                .execute()
        );
    }

    public async remove(id: string): Promise<void> {
        await this.manager.delete(UserModel, { id });
    }

}
