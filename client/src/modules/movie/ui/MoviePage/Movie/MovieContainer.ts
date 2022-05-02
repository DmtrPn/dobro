import React from 'react';
import { inject, observer } from 'mobx-react';
import { action, makeObservable, observable } from 'mobx';

import { MovieData } from 'dobro-types/frontend';
import { Optional } from 'dobro-types/common';
import { MovieStatus } from 'dobro-types/enums';

import { MovieStore } from '@movie/store/MovieStore';

import { MovieForm } from '../MovieForm';
import { Movie, MovieProps } from './Movie';
import { movieService } from '@movie/services/movieService';
import { OptionType } from '@components/Select/types';
import { AppStore } from '@store/App/AppStore';
import { isDefined } from '@utils/isDefined';

interface Props extends MovieProps {
    id: string;
}

interface StoreProps {
    movieStore: MovieStore;
    appStore: AppStore;
}

const injectableStores: (keyof StoreProps)[] = [
    MovieStore.Name,
    AppStore.Name,
];

@observer
class Container extends React.Component<Props & StoreProps> {

    @observable private editMode = false;
    // @observable private userRating?: number;

    constructor(props: Props & StoreProps) {
        super(props);

        makeObservable(this);
    }

    public render() {
        const { movieStore: { movieList }, id } = this.props;
        return this.editMode
            ? React.createElement(MovieForm, {
                id: this.props.id,
                data: this.movie,
                onFinish: this.onFinish,
            })
            : React.createElement(Movie, {
                movie: this.movie,
                userRating: this.userRating,
                rating: movieList.get(id).rating,
                onEditClick: this.onEditClick,
                toggleStatus: this.toggleStatus,
                onRatingChange: this.onRatingChange,
            });
    }

    private get userRating(): Optional<number> {
        const { appStore: { authUserId }, id, movieStore: { movieList } } = this.props;

        return isDefined(authUserId) ? movieList.get(id).getUserRating(authUserId) : undefined;
    }

    private get movie(): MovieData {
        const { movieStore: { movieList }, id } = this.props;
        return movieList.get(id).serialize();
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

    @action.bound
    private async onRatingChange({ value: rating }: OptionType<number>): Promise<void> {
        await movieService.updateMovieRating({ rating, movieId: this.props.id });
    }
}

export const MovieContainer = inject<Props, StoreProps>(...injectableStores)(Container);
