import { EntityName, ActionType, RoleName } from '@core/access-control/types';
import { ForbiddenError } from '@core/http-error';

import { AccessControlUseCaseCommand } from './AccessControlUseCaseCommand';

export abstract class EntityAccessControlUseCaseCommand<T extends object> extends AccessControlUseCaseCommand<T> {

    protected abstract entityName: EntityName;
    protected abstract action: ActionType;

    protected checkRight(userRoles: RoleName[]): void {
        const can = this.accessControl.can(userRoles, this.entityName, this.action);

        if (!can) {
            throw new ForbiddenError();
        }
    }

}