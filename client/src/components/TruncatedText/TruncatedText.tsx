import React, { RefObject, useRef, useEffect, useState } from 'react';
import classnames from 'classnames';

import style from './TruncatedText.scss';

export interface TruncatedTextProps {
    text: string;
    maxLine?: number;
}

export function TruncatedText({ text = '', maxLine = 2 }: TruncatedTextProps): JSX.Element {
    const truncatedTextRef: RefObject<HTMLDivElement> = useRef(null);
    const [isTruncated, setIsTruncated] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const offsetHeight = truncatedTextRef.current?.offsetHeight || 0;
        const scrollHeight = truncatedTextRef.current?.scrollHeight || 0;

        setIsTruncated(scrollHeight > offsetHeight);
    }, []);

    function toggleIsOpen(): void {
        setIsOpen(!isOpen);
    }

    return (
        <div className={classnames([style.root, isTruncated && style.truncated])} onClick={toggleIsOpen}>
            {isOpen ? (
                text
            ) : (
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
