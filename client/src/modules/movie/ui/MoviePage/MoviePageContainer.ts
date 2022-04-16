import React from 'react';
import { observer, inject } from 'mobx-react';
import { observable, action, makeObservable } from 'mobx';

import { MoviePage, MoviePageProps } from './MoviePage';
import { MovieStore } from '@movie/store/MovieStore';
import { movieService } from '@movie/services/movieService';
import { privatePage } from '@core/decorators/privatePage';

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
            ids: movieList.ids,
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
