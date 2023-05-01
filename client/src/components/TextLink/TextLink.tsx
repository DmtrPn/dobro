import React from 'react';
import classnames from 'classnames';

import style from './TextLink.scss';

export enum TextLinkTheme {
    // @ts-ignore
    Bold = style.root_bold,
}

export interface TextLinkProps {
    link: string;
    theme?: TextLinkTheme;
    label: React.ReactNode;
    isHighlighted?: boolean;
}

interface Props extends TextLinkProps {}

export function TextLink({ link, label, theme, isHighlighted }: Props): JSX.Element {
    return (
        <a
            className={classnames([style.root, isHighlighted && style.root_highlighted, theme])}
            href={link}
            target="_blank"
        >
            {label}
        </a>
    );
}
