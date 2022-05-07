import { Rule } from '@core/access-control/Rule';
import { EntityName, EntityPermission } from '@core/access-control/types';

export class MovieRule extends Rule {

    protected moderatorAccess = true;
    protected create: EntityPermission = {};
    protected edit: EntityPermission = {};
    protected remove: EntityPermission = {};
    protected view: EntityPermission = {};

    get entity(): EntityName {
        return EntityName.Movie;
    }

}
