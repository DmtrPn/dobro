import React from 'react';

import style from './CreateForm.scss';

import { MovieCreateData } from 'dobro-types/frontend';

import { Input } from '@components/Input';
import { Textarea } from '@components/Textarea';
import { SaveButton } from '@components/ActionButtons/SaveButton';
import { CancelButton } from '@components/ActionButtons/CancelButton';

export interface CreateFormProps {
}

interface Props extends CreateFormProps, Omit<MovieCreateData, 'id'> {
    // movie: Omit<MovieCreateData, 'id'>;
    onTextChange(event: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>): void;
    onSaveClick(): void;
    onCancelClick(): void;
}

export function CreateForm({
    // movie: {
        name,
        link,
        description,
        // status,
        rating,
    // },
    onTextChange,
    onSaveClick,
    onCancelClick,
}: Props): JSX.Element {
    return (
        <div className={style.root}>
            <Input
                title={'Название'}
                name={'name'}
                value={name}
                onBlur={onTextChange}
            />
            <Input
                title={'Ссылка'}
                name={'link'}
                value={link}
                onBlur={onTextChange}
            />
            <Textarea
                title={'Описание'}
                name={'description'}
                value={description}
                onBlur={onTextChange}
            />
            <Input
                title={'Рейтинг'}
                type={'number'}
                min={0}
                max={10}
                name={'rating'}
                value={rating}
                onBlur={onTextChange}
            />
            <SaveButton onSaveClick={onSaveClick}/>
            <CancelButton onCancelClick={onCancelClick}/>
        </div>
    );
}
