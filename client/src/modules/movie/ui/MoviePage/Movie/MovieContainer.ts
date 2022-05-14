import React from 'react';
import { inject, observer } from 'mobx-react';
import { action, makeObservable, observable } from 'mobx';

import { MovieData } from 'dobro-types/frontend';
import { Optional } from 'dobro-types/common';
import { EntityName, MovieStatus } from 'dobro-types/enums';

import { MovieStore } from '@movie/store/MovieStore';

import { MovieForm } from '../MovieForm';
import { Movie, MovieProps } from './Movie';
import { movieService } from '@movie/services/movieService';
import { AppStore } from '@store/App/AppStore';
import { RatingEventData } from '@components/Rating';

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

    constructor(props: Props & StoreProps) {
        super(props);

        makeObservable(this);
    }

    public render() {
        const { movieStore: { movieList }, id, appStore: { authUser } } = this.props;

        return this.editMode
            ? React.createElement(MovieForm, {
                id: this.props.id,
                data: this.movie,
                onFinish: this.onFinish,
            })
            : React.createElement(Movie, {
                canEdit: authUser?.isEntityModerator(EntityName.Movie) || false,
                movie: this.movie,
                userRating: this.userRating,
                rating: movieList.get(id).serialize().rating.toFixed(1),
                onEditClick: this.onEditClick,
                toggleStatus: this.toggleStatus,
                onRatingChange: this.onRatingChange,
            });
    }

    private get userRating(): Optional<number> {
        const { appStore: { isAuthorized, authUser }, id } = this.props;

        return isAuthorized ? authUser!.getMovieRating(id) : undefined;
    }

    private get movie(): MovieData & { posterUrl?: string; } {
        const { movieStore: { movieList }, id } = this.props;
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
    private async toggleStatus(): Promise<void> {
        const status = this.movie.status === MovieStatus.New ? MovieStatus.Viewed : MovieStatus.New;
        await movieService.update(this.movie.id, { status });
    }

    @action.bound
    private onFinish(): void {
        this.editMode = false;
    }

    @action.bound
    private async onRatingChange(event: React.MouseEvent<HTMLDivElement>, { rating }: RatingEventData): Promise<void> {
        await movieService.updateMovieRating({ rating: Number(rating), movieId: this.props.id });
    }
}

export const MovieContainer = inject<Props, StoreProps>(...injectableStores)(Container);
