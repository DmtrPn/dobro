import React from 'react';
import autobind from 'autobind';

import { MovieCreateData } from 'dobro-types/frontend';

import { movieService } from '@movie/services/movieService';
import { MovieMutableData, MovieMutableDataParams } from '@movie/store/models/MovieMuttableData';

import { FieldType, Form, FormFiledParams } from '@components/Form';

interface Props {
    id?: string;
    data?: MovieMutableDataParams;
    onFinish(): void;
}

export class MovieFormContainer extends React.Component<Props> {

    public render() {
        return React.createElement(Form, {
            mutableData: MovieMutableData,
            filedParams: this.makeFiledParams(),
            data: this.props.data ?? {
                name: 'Название',
                link: 'Ссылка',
                description: '',
            },
            onSaveClick: this.onSaveClick,
            onCancelClick: this.onCancelClick,
        });
    }

    @autobind
    private async onSaveClick(movie: Omit<MovieCreateData, 'id'>): Promise<void> {
        const { id, onFinish } = this.props;
        if (!!id) {
            await movieService.update(id, movie);
        } else {
            await movieService.create(movie);
        }
        onFinish();
    }

    @autobind
    private async onCancelClick(): Promise<void> {
        this.props.onFinish();
    }

    private makeFiledParams(): FormFiledParams[] {
        return [
            {
                type: FieldType.Input,
                title: 'Название',
                name: 'name',
            },
            {
                type: FieldType.Input,
                title: 'Ссылка',
                name: 'link',
            },
            {
                type: FieldType.Textarea,
                title: 'Описание',
                name: 'description',
            },
        ];
    }
}
