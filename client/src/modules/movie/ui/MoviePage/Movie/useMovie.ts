import React from 'react';

import { MovieData, UserMovieData } from 'dobro-types/frontend';
import { EntityName } from 'dobro-types/enums';
import { Optional } from 'dobro-types/common';

import { RatingEventData } from '@components/Rating';
import { useStore } from '@store/useStore';
import { AppStore } from '@store/App/AppStore';
import { MovieStore } from '../../../store/MovieStore';
import { authUserService } from '@store/App/service/authUserService';

interface UseMovieParams {
    id: string;
}

interface UseMovieData {
    canEdit: boolean;
    movie: MovieData & { posterUrl?: string };
    rating: string;
    isViewed: boolean;
    userRating?: number;
    toggleStatus(): void;
    onRatingChange(event: React.MouseEvent<HTMLDivElement>, data: RatingEventData): void;
}
export function useMovie({ id }: UseMovieParams): UseMovieData {
    const {
        movieStore: { movieList },
        appStore: { authUser, isAuthorized },
    } = useStore([AppStore.Name, MovieStore.Name]);

    function getMovie() {
        const movie = movieList.get(id);

        return {
            posterUrl: movie.posterUrl,
            ...movie.serialize(),
        };
    }

    function userMovieData(): Optional<UserMovieData> {
        return isAuthorized ? authUser!.movies.get(id) : undefined;
    }

    async function toggleStatus(): Promise<void> {
        await authUserService.updateMovie({
            movieId: id,
            isViewed: !userMovieData()?.isViewed,
        });
    }

    async function onRatingChange(event: React.MouseEvent<HTMLDivElement>, { rating }: RatingEventData): Promise<void> {
        await authUserService.updateMovie({ rating: Number(rating), movieId: id });
    }

    return {
        toggleStatus,
        onRatingChange,
        canEdit: authUser?.isEntityModerator(EntityName.Movie) || false,
        movie: getMovie(),
        isViewed: userMovieData()?.isViewed ?? false,
        userRating: userMovieData()?.rating ?? 0,
        rating: movieList.get(id).serialize().rating.toFixed(1),
    };
}
