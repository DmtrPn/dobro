import { AccessControl } from './AccessControl';

import { MoviePermission } from '@catalog/access/MoviePermission';

const accessControl = AccessControl.getInstance();

accessControl.addEntityPermission(MoviePermission.entity, MoviePermission);
