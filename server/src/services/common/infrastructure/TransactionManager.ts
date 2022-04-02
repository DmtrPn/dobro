import { EntityManager } from 'typeorm';

import { DbConnector } from '@core/db-connector';

export abstract class TransactionManager {
    private dbConnector = DbConnector.getInstance();

    protected get manager(): EntityManager {
        return this.dbConnector.getDataSource().manager;
    }
}