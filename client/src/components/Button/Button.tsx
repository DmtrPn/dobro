import React from 'react';
import classnames from 'classnames';

import style from './Button.scss';

export interface ButtonParams extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    theme?: ButtonTheme;
    modifiers?: ButtonModifiers[];
    label?: string;
    children?: React.ReactChild;
}

export enum ButtonTheme {
    // @ts-ignore
    Primary = style.primary,
    // @ts-ignore
    Light = style.light,
}

export enum ButtonModifiers {
}

interface Props extends ButtonParams {
}

export function Button({
    theme = ButtonTheme.Primary,
    modifiers = [],
    children,
    label,
    ...props
}: Props): JSX.Element {
    return (
        // @ts-ignore
        <button
            className={classnames([style.root, theme, ...modifiers])}
            {...props}
        >
            {children || label}
        </button>
    );
}
