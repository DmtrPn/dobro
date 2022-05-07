import {
    EntityName,
    ActionType,
    EntityPermission,
    RoleName,
} from './types';

export abstract class Rule {

    public static entity: EntityName;
    protected abstract [ActionType.View]: EntityPermission;
    protected abstract [ActionType.Create]: EntityPermission;
    protected abstract [ActionType.Edit]: EntityPermission;
    protected abstract [ActionType.Remove]: EntityPermission;

    protected adminAccess = true;
    protected moderatorAccess = false;

    public checkPermission(action: ActionType, userRoles: RoleName[]): boolean {
        return this.hasAdminPermission(userRoles) || this.hasActionAccess(action) || this.checkActionAccess(action, userRoles);
    }

    protected hasAdminPermission(userRoles: RoleName[]): boolean {
        return this.adminAccess && userRoles.includes(RoleName.Admin);
    }

    protected hasModeratorPermission(userRoles: RoleName[]): boolean {
        return this.moderatorAccess && userRoles.includes(RoleName.Moderator);
    }

    private hasActionAccess(action: ActionType): boolean {
        return !!this[action].any;
    }

    private checkActionAccess(action: ActionType, userRoles: RoleName[]): boolean {
        const permission = this[action].any;
        return userRoles.some(role => permission.has(role));
    }

}
