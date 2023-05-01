import React from 'react';
import { inject, observer } from 'mobx-react';
import { action, makeObservable, observable } from 'mobx';

import { MovieData, UserMovieData } from 'dobro-types/frontend';
import { Optional } from 'dobro-types/common';
import { EntityName } from 'dobro-types/enums';

import { MovieStore } from '@movie/store/MovieStore';

import { MovieForm } from '../MovieForm';
import { Movie, MovieProps } from './Movie';
import { AppStore } from '@store/App/AppStore';
import { RatingEventData } from '@components/Rating';
import { authUserService } from '@store/App/service/authUserService';

interface Props extends MovieProps {
    id: string;
}

interface StoreProps {
    movieStore: MovieStore;
    appStore: AppStore;
}

const injectableStores: (keyof StoreProps)[] = [MovieStore.Name, AppStore.Name];

@observer
class Container extends React.Component<Props & StoreProps> {
    @observable private editMode = false;

    constructor(props: Props & StoreProps) {
        super(props);

        makeObservable(this);
    }

    public render() {
        const {
            movieStore: { movieList },
            id,
            appStore: { authUser },
        } = this.props;

        return this.editMode
            ? React.createElement(MovieForm, {
                  id: this.props.id,
                  data: this.movie,
                  onFinish: this.onFinish,
              })
            : React.createElement(Movie, {
                  canEdit: authUser?.isEntityModerator(EntityName.Movie) || false,
                  movie: this.movie,
                  isViewed: this.userMovieData?.isViewed ?? false,
                  userRating: this.userMovieData?.rating ?? 0,
                  rating: movieList.get(id).serialize().rating.toFixed(1),
                  onEditClick: this.onEditClick,
                  toggleStatus: this.toggleStatus,
                  onRatingChange: this.onRatingChange,
              });
    }

    private get userMovieData(): Optional<UserMovieData> {
        const {
            appStore: { isAuthorized, authUser },
            id,
        } = this.props;

        return isAuthorized ? authUser!.movies.get(id) : undefined;
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
    private async toggleStatus(): Promise<void> {
        await authUserService.updateMovie({
            movieId: this.props.id,
            isViewed: !this.userMovieData?.isViewed,
        });
    }

    @action.bound
    private onFinish(): void {
        this.editMode = false;
    }

    @action.bound
    private async onRatingChange(event: React.MouseEvent<HTMLDivElement>, { rating }: RatingEventData): Promise<void> {
        await authUserService.updateMovie({ rating: Number(rating), movieId: this.props.id });
    }
}

export const MovieContainer = inject<Props, StoreProps>(...injectableStores)(Container);
