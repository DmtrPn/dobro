import React from 'react';
import autobind from 'autobind';
import { observer } from 'mobx-react';
import { observable, makeObservable } from 'mobx';

import { MovieCreateData } from 'dobro-types/frontend';

import { MovieForm, MovieFormProps } from './MovieForm';
import { movieService } from '@movie/services/movieService';

interface Props extends MovieFormProps {
    onFinishCreate(): void;
}

@observer
export class MovieFormContainer extends React.Component<Props> {

    @observable private movie: Omit<MovieCreateData, 'id'> = {
        name: 'Название',
        link: 'Ссылка',
        description: ''
    }

    constructor(props: Props) {
        super(props);

        makeObservable(this);
    }

    public render() {
        return React.createElement(MovieForm, {
            ...this.movie,
            onTextChange: this.onTextChange,
            onSaveClick: this.onSaveClick,
            onCancelClick: this.onCancelClick,
        });
    }

    @autobind
    private async onTextChange({ target: { value, name } }: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>): Promise<void> {
        this.movie[name] = value;
    }

    @autobind
    private async onSaveClick(): Promise<void> {
        await movieService.create(this.movie);
        this.props.onFinishCreate()
    }

    @autobind
    private async onCancelClick(): Promise<void> {
        this.props.onFinishCreate()
    }
}
