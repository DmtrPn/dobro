import { Class } from 'dobro-types/common';

import { TransactionManager } from '@common/infrastructure/TransactionManager';
import { FindCommand } from '@common/infrastructure/FindCommand';

export abstract class QueryService<
    M extends object,
    FO extends object = {},
>  extends TransactionManager {

    protected abstract modelClass: Class<M>;
    protected abstract findCommand: Class<FindCommand<M, FO>>;

    public find(options: FO): Promise<M[]> {
        const command = new this.findCommand(options);
        return command.execute();
    }

}
