import React from 'react';
import Truncate from 'react-truncate';

export interface TextTruncateProps {
    text: string;
    maxLine?: number;
    additionalClassName?: string;
    splitByLetters?: boolean;
    isTruncated?: (isTruncated: boolean) => void;
}

interface Props extends TextTruncateProps {
}

export function TextTruncate({
    text,
    maxLine = 3,
    additionalClassName,
    isTruncated,
}: Props): JSX.Element {

    return (
        <Truncate
            className={additionalClassName}
            children={text ? `${text}` : ''}
            lines={maxLine}
            onTruncate={isTruncated}
        />
    );
}
