import React from 'react';

import style from './Movie.scss';

import { MovieData } from 'dobro-types/frontend';

// import { Input } from '@components/Input';
import { Textarea } from '@components/Textarea';
import { TextLink } from '@components/TextLink';

export interface MovieProps {
}

interface Props extends MovieProps {
    movie: MovieData;
    onTextChange(event: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>): void;
}

export function Movie({
    movie: {
        name,
        link,
        description,
        rating,
    },
    onTextChange,
}: Props): JSX.Element {
    return (
        <div className={style.root}>
            <TextLink link={link} label={name} />
            <Textarea
                // title={'Описание'}
                name={'description'}
                value={description}
                onBlur={onTextChange}
            />
            {/*<Input*/}
            {/*    title={'Рейтинг'}*/}
            {/*    type={'number'}*/}
            {/*    min={0}*/}
            {/*    max={10}*/}
            {/*    name={'rating'}*/}
            {/*    value={rating}*/}
            {/*    onBlur={onTextChange}*/}
            {/*/>*/}
        </div>
    );
}
