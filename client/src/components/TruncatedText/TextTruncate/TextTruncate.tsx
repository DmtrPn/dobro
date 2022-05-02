import React from 'react';
import LinesEllipsis from 'react-lines-ellipsis';

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
    splitByLetters = false,
    additionalClassName,
    isTruncated,
}: Props): JSX.Element {
    const onReflow = ({ clamped }: { clamped: boolean, text: string }) => {
        isTruncated?.(clamped);
    };
    return (
        <LinesEllipsis
            className={additionalClassName}
            text={text ? `${text}` : ''}
            maxLine={maxLine}
            basedOn={splitByLetters ? 'letters' : 'words'}
            onReflow={isTruncated ? onReflow : undefined}
        />
    );
}
