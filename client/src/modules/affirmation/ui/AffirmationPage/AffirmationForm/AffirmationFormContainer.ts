import React from 'react';
import autobind from 'autobind';

import { AffirmationCreateData } from 'dobro-types/frontend';

import { affirmationService } from '@affirmation/services/affirmationService';
import { AffirmationMutableDataParams } from '@affirmation/store/models/AffirmationMuttableData';

import { FieldType, Form, FormFiledParams } from '@components/Form';

interface Props {
    id?: string;
    onFinish(): void;
}

export class AffirmationFormContainer extends React.Component<Props> {

    public render() {
        return React.createElement(Form, {
            mutableData: AffirmationMutableDataParams,
            filedParams: this.makeFiledParams(),
            data: {
                name: 'Живи',
            },
            onSaveClick: this.onSaveClick,
            onCancelClick: this.onCancelClick,
        });
    }

    @autobind
    private async onSaveClick(affirmation: Omit<AffirmationCreateData, 'id'>): Promise<void> {
        const { id, onFinish } = this.props;

        if (!!id) {
            await affirmationService.update(id, affirmation);
        } else {
            await affirmationService.create(affirmation);
        }

        onFinish()
    }

    @autobind
    private async onCancelClick(): Promise<void> {
        this.props.onFinish()
    }

    private makeFiledParams(): FormFiledParams[] {
        return [
            {
                type: FieldType.Textarea,
                title: 'Аффирмация',
                name: 'text',
            },
        ];
    }
}
