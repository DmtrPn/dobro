export enum RoleName {
    Admin = 'admin',
    Moderator = 'moderator',
    User = 'user',
}

export enum EntityName {
    Movie = 'movie',
    MovieRating = 'movieRating',
    Affirmation = 'affirmation',
}

export enum ActionType {
    View = 'view',
    Create = 'create',
    Edit = 'edit',
    Remove = 'remove',
}

export type Permission = {
    adminAccess?: boolean;
    moderatorAccess?: boolean;
    any: Set<RoleName>;
    own?: Set<RoleName>;
};

export interface RuleData<E extends object = object> {
    user: object;
    entity: E;
}
