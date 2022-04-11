import React from 'react';
import autobind from 'autobind';
import { observer, inject } from 'mobx-react';

import { Movie, MovieProps } from './Movie';
import { MovieStore } from '@movie/store';
import { movieService } from '@movie/services';
import { MovieData } from 'dobro-types/frontend';

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
class Container extends React.Component<Props> {
    readonly declare props: Props & StoreProps;

    public render() {
        return React.createElement(Movie, {
            movie: this.movie,
            onTextChange: this.onTextChange,
        });
    }

    @autobind
    private async onTextChange({ target: { value, name } }: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>): Promise<void> {
        const { id } = this.props;

        if (this.movie[name] !== value) {
            await movieService.update(id, { [ name ]: value });
        }
    }

    private get movie(): MovieData {
        const { movieStore: { movieList }, id } = this.props;
        return movieList.get(id);
    }
}

export const MovieContainer = inject(...injectableStores)(Container)
