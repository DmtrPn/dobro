import React from 'react';
import autobind from 'autobind';
import { observer } from 'mobx-react';
import { observable, makeObservable } from 'mobx';

import { Class } from 'dobro-types/common';

import { MutableData } from '@store/abstract/MutableData';
import { removeUndefinedKeys } from '@utils/removeUndefinedKeys';

import { Form, FormProps, FiledParams } from './Form';

export interface FormFiledParams extends Omit<FiledParams, 'value'> {}

interface Props extends FormProps {
    mutableData: Class<MutableData<any>>;
    filedParams: FormFiledParams[];
    data: object;
    onSaveClick(data: object): void;
    onCancelClick(): void;
}

@observer
export class FormContainer extends React.Component<Props> {

    @observable private mutableData!: MutableData<any>;

    constructor(props: Props) {
        super(props);

        const { mutableData, data } = props;

        this.mutableData = new mutableData(data);

        makeObservable(this);
    }

    public render() {
        const { filedParams } = this.props;
        return React.createElement(Form, {
            fields: filedParams.map(params => ({
                ...params,
                value: this.mutableData.getValue(params.name),
            })),
            onTextChange: this.onTextChange,
            onSaveClick: this.onSaveClick,
            onCancelClick: this.onCancelClick,
        });
    }

    @autobind
    private async onTextChange({ target: { value, name } }: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>): Promise<void> {
        this.mutableData.update({ [name]: value });
    }

    @autobind
    private async onSaveClick(): Promise<void> {
        this.props.onSaveClick(removeUndefinedKeys(this.mutableData.serialize()));
    }

    @autobind
    private async onCancelClick(): Promise<void> {
        this.props.onCancelClick();
    }
}
