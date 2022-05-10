import { EntityPermission } from '@core/access-control/abstract/EntityPermission';
import { ActionType, EntityName, Permission, RoleName } from '@core/access-control/types';

export class MoviePermission extends EntityPermission {

    protected [ActionType.View]: Permission = {
        moderatorAccess: true,
        any: new Set([RoleName.User]),
    };

    public static get entity(): EntityName {
        return EntityName.Movie;
    }

}
