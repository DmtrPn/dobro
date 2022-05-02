import React from 'react';
import classnames from 'classnames';

import style from './TruncatedText.scss';

import { TextTruncate } from './TextTruncate';

export interface TruncatedTextProps {
    additionalClassName?: string;
    text: string;
    maxLine?: number;
    splitByLetters?: boolean;
}

interface Props extends TruncatedTextProps {
    isOpen: boolean;
    isTruncated: boolean;
    toggleIsOpen(): void;
    onTruncate(isTruncated: boolean): void;
}

export function TruncatedText({
    additionalClassName,
    isOpen,
    text = '',
    maxLine = 2,
    splitByLetters,
    isTruncated,
    onTruncate,
    toggleIsOpen,
}: Props): JSX.Element {
    return (
        <div
            className={classnames([
                style.root,
                isTruncated && style.truncated,
                additionalClassName,
            ])}
            onClick={toggleIsOpen} // isTruncated ? toggleIsOpen : undefined}
        >
            {isOpen
                ? text
                : (
                    <TextTruncate
                        text={text}
                        maxLine={maxLine}
                        splitByLetters={splitByLetters}
                        isTruncated={onTruncate}
                    />
                )}
        </div>
    );
}
