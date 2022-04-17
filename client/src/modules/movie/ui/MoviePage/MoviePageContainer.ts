import React from 'react';
import { inject, observer } from 'mobx-react';
import { action, makeObservable, observable } from 'mobx';

import { MovieStatus } from 'dobro-types/enums';

import { MovieStore } from '@movie/store/MovieStore';
import { movieService } from '@movie/services/movieService';
import { privatePage } from '@core/decorators/privatePage';

import { MoviePage, MoviePageProps } from './MoviePage';

interface Props extends MoviePageProps {
}

interface StoreProps {
    movieStore: MovieStore;
}

const injectableStores: (keyof StoreProps)[] = [
    MovieStore.Name,
];

@privatePage
@inject(...injectableStores)
@observer
export class MoviePageContainer extends React.Component<Props & StoreProps> {

    @observable private addMode = false;

    constructor(props: Props & StoreProps) {
        super(props);

        makeObservable(this);
    }

    public async componentDidMount(): Promise<void> {
        await movieService.load();
    }

    public render() {
        const { movieStore: { movieList } } = this.props;
        return React.createElement(MoviePage, {
            ids: [
                ...movieList.getFilteredValuesIds({ status: MovieStatus.New }),
                ...movieList.getFilteredValuesIds({ status: MovieStatus.Viewed }),
                ...movieList.getFilteredValuesIds({ status: MovieStatus.Rejected }),
            ],
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
