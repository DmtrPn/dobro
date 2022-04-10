import React from 'react';

import style from './MovieForm.scss';

import { MovieCreateData } from 'dobro-types/frontend';

import { Input } from '@components/Input';
import { Textarea } from '@components/Textarea';
import { SaveButton } from '@components/ActionButtons/SaveButton';
import { CancelButton } from '@components/ActionButtons/CancelButton';

export interface MovieFormProps {
}

interface Props extends MovieFormProps, Omit<MovieCreateData, 'id'> {
    onTextChange(event: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>): void;
    onSaveClick(): void;
    onCancelClick(): void;
}

export function MovieForm({
    name,
    link,
    description,
    rating,
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
            <div className={style.buttons}>
                <SaveButton onSaveClick={onSaveClick}/>
                <CancelButton onCancelClick={onCancelClick}/>
            </div>

        </div>
    );
}
