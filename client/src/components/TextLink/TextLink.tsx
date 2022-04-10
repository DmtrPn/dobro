import React from 'react';
import classnames from 'classnames';

import style from './TextLink.scss';

export interface TextLinkProps {
    link: string;
    label: React.ReactChild;
    isHighlighted?: boolean;
}

interface Props extends TextLinkProps {
}

export function TextLink({
    link,
    label,
    isHighlighted,
}: Props): JSX.Element {
    return (
        <a
            className={classnames([
                style.root,
                isHighlighted && style.root_highlighted,
            ])}
            href={link}
            target="_blank"
        >
            {label}
        </a>
    );
}
