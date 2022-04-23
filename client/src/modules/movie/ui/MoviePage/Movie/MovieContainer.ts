import React from 'react';
import { inject, observer } from 'mobx-react';
import { action, makeObservable, observable } from 'mobx';

import { MovieData } from 'dobro-types/frontend';
import { MovieStatus } from 'dobro-types/enums';

import { MovieStore } from '@movie/store/MovieStore';

import { MovieForm } from '../MovieForm';
import { Movie, MovieProps } from './Movie';
import { movieService } from '@movie/services/movieService';

interface Props extends MovieProps {
    id: string;
}

interface StoreProps {
    movieStore: MovieStore;
}

const injectableStores: (keyof StoreProps)[] = [
    MovieStore.Name,
];

@observer
class Container extends React.Component<Props & StoreProps> {

    @observable private editMode = false;

    constructor(props: Props & StoreProps) {
        super(props);

        makeObservable(this);
    }

    public render() {
        return this.editMode
            ? React.createElement(MovieForm, {
                id: this.props.id,
                data: this.movie,
                onFinish: this.onFinish,
            })
            : React.createElement(Movie, {
                movie: this.movie,
                onEditClick: this.onEditClick,
                toggleStatus: this.toggleStatus,
            });
    }

    @action.bound
    private onEditClick(): void {
        this.editMode = true;
    }

    @action.bound
    private async toggleStatus(): Promise<void> {
        const status = this.movie.status === MovieStatus.New ? MovieStatus.Viewed : MovieStatus.New;
        await movieService.update(this.movie.id, { status });
    }

    @action.bound
    private onFinish(): void {
        this.editMode = false;
    }

    private get movie(): MovieData {
        const { movieStore: { movieList }, id } = this.props;
        return movieList.get(id).serialize();
    }
}

export const MovieContainer = inject<Props, StoreProps>(...injectableStores)(Container)
