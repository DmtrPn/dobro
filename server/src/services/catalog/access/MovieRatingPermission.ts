import { EntityPermission } from '@core/access-control/abstract/EntityPermission';
import { EntityName } from '@core/access-control/types';

export class MovieRatingPermission extends EntityPermission {

    public static get entity(): EntityName {
        return EntityName.MovieRating;
    }

}
