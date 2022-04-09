import React from 'react';
import classnames from 'classnames';

import style from './Input.scss';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    modifiers?: string[];
}

export const InputModifier = {
};

export function Input({
    modifiers = [],
    type = 'text',
    ...props
}: InputProps): JSX.Element {
    return (
        <div className={style.root}>
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
