import { DbConnector } from '@core/db-connector';

const dbConnector = DbConnector.getInstance();

beforeAll(async () => {
    await dbConnector.initialize();
    const entities = dbConnector.getDataSource().entityMetadatas;
    await Promise.all(entities.map(entity =>
        dbConnector.getDataSource().manager.query(`TRUNCATE TABLE ${entity.tableName}`)
    ));
})

afterAll(async () => {
    await dbConnector.closeConnection();
})
