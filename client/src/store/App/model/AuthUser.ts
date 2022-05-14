import { makeObservable, observable, action } from 'mobx';

import { UserData, UserMovieData } from 'dobro-types/frontend';
import { EntityName, RoleName, UserStatus } from 'dobro-types/enums';

import { assignParams } from '@utils/assignParams';

import { UserMovieList } from './UserMovieList';

export class AuthUser {

    @observable public readonly id!: string;
    @observable public readonly name!: string;
    @observable public readonly email!: string;
    @observable public status!: UserStatus;
    @observable public roles!: Set<RoleName>;
    @observable public entities!: Set<EntityName>;
    @observable public readonly movies = new UserMovieList();

    constructor({
        roles,
        entities,
        ...user
    }: UserData) {
        makeObservable(this);

        assignParams<Omit<UserData, 'roles' | 'entities'>>(this, user);

        this.roles = new Set<RoleName>(roles);
        this.entities = new Set<EntityName>(entities);
    }

    public get isAdmin(): boolean {
        return this.roles.has(RoleName.Admin);
    }

    public isEntityModerator(entityName: EntityName): boolean {
        return this.isAdmin ||
            (this.entities.has(entityName)
            && this.roles.has(RoleName.Moderator));
    }

    public getMovieRating(movieId: string): number {
        return this.movies.get(movieId)?.rating ?? 0;
    }

    @action
    public setMovies(userMovies: UserMovieData[]): void {
        this.movies.set(userMovies);
    }

    @action
    public updateMovieRating(movieId: string, rating: number): void {
        if (this.movies.has(movieId)) {
            this.movies.update(movieId, { rating });
        } else {
            this.movies.add([{
                rating,
                movieId,
                userId: this.id,
                isViewed: false,
            }]);
        }

    }

}
