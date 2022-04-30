import React from 'react';

import style from './Form.scss';

import { Input } from '@components/Input';
import { Textarea } from '@components/Textarea';
import { SaveButton } from '@components/ActionButtons/SaveButton';
import { CancelButton } from '@components/ActionButtons/CancelButton';

export interface FormProps {
}

export const enum FieldType {
    Input = 'input',
    Textarea = 'textarea',
}

const FIELD_COMPONENTS: {
    [key: string]: React.ComponentType<any>;
} = {
    [FieldType.Input]: Input,
    [FieldType.Textarea]: Textarea,
};

export interface FiledParams {
    type: FieldType;
    title: string;
    name: string;
    value: any;
}

interface Props extends FormProps {
    fields: FiledParams[];
    onTextChange(event: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>): void;
    onSaveClick(): void;
    onCancelClick(): void;
}

export function Form({
    fields,
    onTextChange,
    onSaveClick,
    onCancelClick,
}: Props): JSX.Element {
    return (
        <div className={style.root}>
            {fields.map(field => (
                React.createElement(FIELD_COMPONENTS[field.type], {
                    key: field.name,
                    title: field.title,
                    name: field.name,
                    value: field.value,
                    onBlur: onTextChange,
                })
            ))}
            <div className={style.buttons}>
                <SaveButton onSaveClick={onSaveClick}/>
                <CancelButton onCancelClick={onCancelClick}/>
            </div>

        </div>
    );
}
