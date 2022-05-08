import { AccessControl } from './AccessControl';

import { MoviePermission } from '@catalog/access/MoviePermission';
import { MovieRatingPermission } from '@catalog/access/MovieRatingPermission';
import { AffirmationPermission } from '@catalog/access/AffirmationPermission';

const accessControl = AccessControl.getInstance();

accessControl.addEntityPermission(MoviePermission.entity, MoviePermission);
accessControl.addEntityPermission(MovieRatingPermission.entity, MovieRatingPermission);
accessControl.addEntityPermission(AffirmationPermission.entity, AffirmationPermission);
