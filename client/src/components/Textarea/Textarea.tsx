import React from 'react';
import TextareaAutosize, { TextareaAutosizeProps } from 'react-textarea-autosize';
import classnames from 'classnames';

import style from './Textarea.scss';

import { FieldTitle } from '@components/FieldTitle';
import { useCheckOnFocus } from '../hooks/useCheckOnFocus';

export const TextareaModifiers = {};

export interface TextareaProps extends TextareaAutosizeProps {
    title?: string;
    value?: string;
    rows?: number;
    minRows?: number;
    maxRows?: number;
    modifiers?: string[];
    textareaRef?: React.RefObject<HTMLTextAreaElement>;
    onHeightChange?(height: number): void;
    onChange?(event: React.ChangeEvent<HTMLTextAreaElement>): void;
}

interface Props extends TextareaProps {}

export function Textarea({
    title,
    minRows,
    placeholder,
    ref,
    modifiers = [],
    disabled,
    textareaRef,
    ...props
}: Props): JSX.Element {
    const { isOnFocus, ...focusHandlers } = useCheckOnFocus(props);
    return (
        <div className={classnames([style.root, isOnFocus && style.active, disabled && style.disabled, ...modifiers])}>
            {title && <FieldTitle title={title} />}
            <TextareaAutosize
                className={style.textarea}
                minRows={minRows || 1}
                placeholder={placeholder ?? ''}
                disabled={disabled}
                ref={textareaRef}
                {...(props as any)}
                {...focusHandlers}
            />
        </div>
    );
}
