import React from 'react';
import { inject, observer } from 'mobx-react';
import { action, makeObservable, observable } from 'mobx';

import { EntityName, MovieStatus } from 'dobro-types/enums';

import { MovieStore } from '@movie/store/MovieStore';
import { movieService } from '@movie/services/movieService';

import { MoviePage, MoviePageProps } from './MoviePage';
import { AppStore } from '@store/App/AppStore';
import { authUserService } from '@store/App/service/authUserService';

interface Props extends MoviePageProps {
}

interface StoreProps {
    movieStore: MovieStore;
    appStore: AppStore;
}

const injectableStores: (keyof StoreProps)[] = [
    MovieStore.Name,
    AppStore.Name,
];

@inject(...injectableStores)
@observer
export class MoviePageContainer extends React.Component<Props & StoreProps> {

    @observable private addMode = false;

    constructor(props: Props & StoreProps) {
        super(props);

        makeObservable(this);
    }

    public async componentDidMount(): Promise<void> {
        await Promise.all([
            movieService.load(),
            authUserService.loadUserMovies(),
        ]);
    }

    public render() {
        const { movieStore: { movieList }, appStore: { authUser } } = this.props;
        const viewedIds = authUser?.movies.getFilteredValuesIds({ isViewed: true }) || [];
        return React.createElement(MoviePage, {
            ids: [
                ...movieList.getFilteredValuesIds({ excludeIds: viewedIds }),
                ...movieList.getFilteredValuesIds({ ids: viewedIds }),
                ...movieList.getFilteredValuesIds({ status: MovieStatus.Rejected }),
            ],
            canEdit: authUser?.isEntityModerator(EntityName.Movie) || false,
            addMode: this.addMode,
            onAddClick: this.onAddClick,
            onFinishCreate: this.onFinishCreate,
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

}
