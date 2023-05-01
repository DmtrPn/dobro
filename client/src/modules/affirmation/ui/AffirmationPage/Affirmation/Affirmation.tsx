import React from 'react';

import style from './Affirmation.scss';

import { AffirmationData } from 'dobro-types/frontend';

import { Textarea } from '@components/Textarea';

export interface AffirmationProps {}

interface Props extends AffirmationProps {
    affirmation: AffirmationData;
    onTextChange(event: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>): void;
}

export function Affirmation({ affirmation: { text }, onTextChange }: Props): JSX.Element {
    return (
        <div className={style.root}>
            <Textarea name={'text'} value={text} onBlur={onTextChange} />
        </div>
    );
}
