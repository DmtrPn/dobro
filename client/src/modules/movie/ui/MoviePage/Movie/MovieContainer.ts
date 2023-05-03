import React from 'react';
import { inject, observer } from 'mobx-react';
import { action, makeObservable, observable } from 'mobx';

import { MovieData } from 'dobro-types/frontend';

import { MovieStore } from '@movie/store/MovieStore';

import { MovieForm } from '../MovieForm';
import { Movie, MovieProps } from './Movie';

interface Props extends MovieProps {
    id: string;
}

interface StoreProps {
    movieStore: MovieStore;
}

const injectableStores: (keyof StoreProps)[] = [MovieStore.Name];

@observer
class Container extends React.Component<Props & StoreProps> {
    @observable private editMode = false;

    constructor(props: Props & StoreProps) {
        super(props);

        makeObservable(this);
    }

    public render() {
        const { id } = this.props;

        return this.editMode
            ? React.createElement(MovieForm, {
                  id: this.props.id,
                  data: this.movie,
                  onFinish: this.onFinish,
              })
            : React.createElement(Movie, {
                  id,
                  onEditClick: this.onEditClick,
              });
    }

    private get movie(): MovieData & { posterUrl?: string } {
        const {
            movieStore: { movieList },
            id,
        } = this.props;
        const movie = movieList.get(id);
        return {
            posterUrl: movie.posterUrl,
            ...movie.serialize(),
        };
    }

    @action.bound
    private onEditClick(): void {
        this.editMode = true;
    }

    @action.bound
    private onFinish(): void {
        this.editMode = false;
    }
}

export const MovieContainer = inject<Props, StoreProps>(...injectableStores)(Container);
