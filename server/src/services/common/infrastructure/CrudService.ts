import { EntityManager, FindOptionsWhere } from 'typeorm';

import { DbConnector } from '@core/db-connector';

type Class<T extends Object, P = any> = { new (...arg: P[]): T };
type Attributes<T extends object> = Omit<T, MethodKeys<T>>;
type MethodKeys<T> = ({[P in keyof T]: T[P] extends Function ? P : never })[keyof T];

export abstract class CrudService<
    M extends object,
    CreationParams extends Partial<M>,
    I,
    FO extends object = {},
> {

    protected modelClass: Class<M>;
    private dbConnector = DbConnector.getInstance();

    protected get manager(): EntityManager {
        return this.dbConnector.getDataSource().manager;
    }

    public async get(id: I): Promise<M | undefined> {
        return this.manager.findOneBy<M>(this.modelClass, { id } as unknown as FindOptionsWhere<M>);
    }

    public async create(params: CreationParams): Promise<void> {
        const theParams = this.enrichCreationParams(params);

        await this.manager
            .createQueryBuilder()
            .insert()
            .into(this.modelClass)
            .values(theParams as M)
            .execute();
    }

    protected abstract enrichCreationParams(params: CreationParams): Attributes<M>;


}
