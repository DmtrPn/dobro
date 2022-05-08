import { EntityPermission } from '@core/access-control/abstract/EntityPermission';
import { EntityName } from '@core/access-control/types';

export class MoviePermission extends EntityPermission {

    protected moderatorAccess = true;

    public static get entity(): EntityName {
        return EntityName.Movie;
    }

}
