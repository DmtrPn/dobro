import React, { RefObject } from 'react';
import classnames from 'classnames';

import style from './TruncatedText.scss';

export interface TruncatedTextProps {
    text: string;
    maxLine?: number;
}

interface Props extends TruncatedTextProps {
    isOpen: boolean;
    isTruncated: boolean;
    truncatedTextRef: RefObject<HTMLDivElement>;
    toggleIsOpen(): void;
}

export function TruncatedText({
    isOpen,
    text = '',
    maxLine = 2,
    truncatedTextRef,
    isTruncated,
    toggleIsOpen,
}: Props): JSX.Element {
    return (
        <div
            className={classnames([
                style.root,
                isTruncated && style.truncated,
            ])}
            onClick={toggleIsOpen}
        >
            {isOpen
                ? text
                : (
                    <div
                        ref={truncatedTextRef}
                        className={style.truncated_text}
                        style={{
                            WebkitLineClamp: maxLine,
                        }}
                    >
                        {text}
                    </div>
                )}
        </div>
    );
}
