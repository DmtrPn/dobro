import * as BackendTypes from '../backend/types';
import * as BackendAuthTypes from '../backend/auth';

import { EntityName, RoleName, UserStatus } from '../enums';

export interface AuthUserData extends BackendTypes.AuthUserViewModel {}
export interface LoginParams extends BackendAuthTypes.LoginParams {}
export interface AuthUserResponse extends BackendTypes.AuthUserResponse {}
export interface UserData extends Omit<BackendTypes.UserViewModel, 'roles' | 'status' | 'entities'> {
    status: UserStatus;
    roles: RoleName[];
    entities: EntityName[];
}
export interface UserResponse extends Omit<BackendTypes.UserResponse, 'user'> {
    user: UserData;
}
