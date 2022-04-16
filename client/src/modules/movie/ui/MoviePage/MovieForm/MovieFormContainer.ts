import React from 'react';
import autobind from 'autobind';

import { MovieCreateData } from 'dobro-types/frontend';

import { movieService } from '@movie/services/movieService';
import { MovieMutableDataParams } from '@movie/store/models/MovieMuttableData';

import { FieldType, Form, FormFiledParams } from '@components/Form';

interface Props {
    onFinishCreate(): void;
}

export class MovieFormContainer extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    public render() {
        return React.createElement(Form, {
            mutableData: MovieMutableDataParams,
            filedParams: this.makeFiledParams(),
            data: {
                name: 'Название',
                link: 'Ссылка',
                description: ''
            },
            onSaveClick: this.onSaveClick,
            onCancelClick: this.onCancelClick,
        });
    }

    @autobind
    private async onSaveClick(movie: Omit<MovieCreateData, 'id'>): Promise<void> {
        await movieService.create(movie);
        this.props.onFinishCreate()
    }

    @autobind
    private async onCancelClick(): Promise<void> {
        this.props.onFinishCreate()
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
