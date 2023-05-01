import React from 'react';
import { inject, observer } from 'mobx-react';
import { action, makeObservable, observable } from 'mobx';

import { EntityName } from 'dobro-types/enums';

import { MovieStore } from '@movie/store/MovieStore';
import { filterMenuData, MovieFilterName } from '@movie/store/types';
import { movieService } from '@movie/services/movieService';
import { AppStore } from '@store/App/AppStore';
import { authUserService } from '@store/App/service/authUserService';
import { MenuEventData } from '@components/Menu';
import { toArrayFromIterable } from '@utils/toArrayFromIterable';

import { MoviePage, MoviePageProps } from './MoviePage';

interface Props extends MoviePageProps {}

interface StoreProps {
    movieStore: MovieStore;
    appStore: AppStore;
}

const injectableStores: (keyof StoreProps)[] = [MovieStore.Name, AppStore.Name];

@inject(...injectableStores)
@observer
export class MoviePageContainer extends React.Component<Props & StoreProps> {
    @observable private addMode = false;
    @observable private selectedMenuItems = new Set<string>([MovieFilterName.New]);
    @observable private searchValue = '';

    constructor(props: Props & StoreProps) {
        super(props);

        makeObservable(this);
    }

    public async componentDidMount(): Promise<void> {
        await Promise.all([movieService.load(), authUserService.loadUserMovies()]);
    }

    public render() {
        const {
            movieStore: { movieList },
            appStore: { authUser },
        } = this.props;
        const viewedIds = authUser?.movies.getFilteredValuesIds({ isViewed: true }) || [];

        return React.createElement(MoviePage, {
            ids: [
                ...(this.selectedMenuItems.has(MovieFilterName.New)
                    ? movieList.getFilteredValuesIds({ excludeIds: viewedIds, name: this.searchValue })
                    : []),
                ...(this.selectedMenuItems.has(MovieFilterName.Viewed)
                    ? movieList.getFilteredValuesIds({ ids: viewedIds, name: this.searchValue })
                    : []),
            ],
            searchValue: this.searchValue,
            menuItems: filterMenuData,
            selectedMenuItems: toArrayFromIterable(this.selectedMenuItems),
            canEdit: authUser?.isEntityModerator(EntityName.Movie) || false,
            addMode: this.addMode,
            onAddClick: this.onAddClick,
            onFinishCreate: this.onFinishCreate,
            onMenuItemClick: this.onMenuItemClick,
            onSearchInputChange: this.onSearchInputChange,
        });
    }

    @action.bound
    private onAddClick(): void {
        this.addMode = true;
    }

    @action.bound
    private onFinishCreate(): void {
        this.addMode = false;
    }

    @action.bound
    private onSearchInputChange({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void {
        this.searchValue = value;
    }

    @action.bound
    private onMenuItemClick(_: React.MouseEvent<HTMLAnchorElement>, { name }: MenuEventData): void {
        if (this.selectedMenuItems.has(name)) {
            this.selectedMenuItems.delete(name);
        } else {
            this.selectedMenuItems.add(name);
        }
    }
}
