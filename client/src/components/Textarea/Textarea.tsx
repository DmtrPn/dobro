import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import classnames from 'classnames';

import style from './Textarea.scss';
import { FieldTitle } from '@components/FieldTitle';

export const TextareaModifiers = {
};

export interface TextareaProps extends React.HTMLProps<HTMLTextAreaElement>  {
    title?: string;
    value?: string;
    rows?: number;
    minRows?: number;
    maxRows?: number;
    modifiers?: string[];
    textareaRef?: React.RefObject<HTMLTextAreaElement>;
    isRequired?: boolean;
    onHeightChange?(height: number): void;
    onChange?(event: React.ChangeEvent<HTMLTextAreaElement>): void;
}

interface Props extends TextareaProps {
    isActive: boolean;
}

// tslint:disable-next-line:cyclomatic-complexity
export function Textarea({
    title,
    minRows,
    placeholder,
    ref,
    modifiers = [],
    isActive,
    disabled,
    textareaRef,
    isRequired = false,
    ...props
}: Props): JSX.Element {
    return (
        <div className={classnames([
            style.root,
            isActive && style.active,
            disabled && style.disabled,
            ...modifiers,
        ])}>
            {title && <FieldTitle title={title} />}
            <TextareaAutosize
                className={style.textarea}
                minRows={minRows || 2}
                placeholder={placeholder ?? ''}
                disabled={disabled}
                ref={textareaRef}
                {...props as any}
            />
        </div>
    );
}
