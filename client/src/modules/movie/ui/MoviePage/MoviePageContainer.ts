import React from 'react';
import autobind from 'autobind';
import { observer, inject } from 'mobx-react';
import { observable, makeObservable } from 'mobx';

import { MoviePage, MoviePageProps } from './MoviePage';
import { MovieStore } from '@movie/store';
import { movieService } from '@movie/services';
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

    @autobind
    private onAddClick(): void {
        this.addMode = true;
    }

    @autobind
    private onFinishCreate(): void {
        this.addMode = false;
    }

}
