import React from 'react';
import classnames from 'classnames';

import style from './Input.scss';

import { FieldTitle } from '@components/FieldTitle';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    modifiers?: string[];
}

export const InputModifier = {
};

export function Input({
    modifiers = [],
    type = 'text',
    title,
    ...props
}: InputProps): JSX.Element {
    return (
        <div className={style.root}>
            {title && <FieldTitle title={title} />}
            <input
                {...props}
                className={classnames([
                    style.input,
                    ...modifiers,
                ])}
                type={type}
            />
        </div>);
};
