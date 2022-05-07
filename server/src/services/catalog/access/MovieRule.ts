import { Rule } from '@core/access-control/Rule';
import { EntityName } from '@core/access-control/types';

export class MovieRule extends Rule {

    protected moderatorAccess = true;

    get entity(): EntityName {
        return EntityName.Movie;
    }

}
