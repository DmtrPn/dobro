import React from 'react';
import autobind from 'autobind';
import isNil from 'lodash/isNil';
import { makeObservable, action, observable } from 'mobx';
import { observer } from 'mobx-react';

import { Nullable } from 'dobro-types/common';

import { checkOnFocusHOC, WithCheckOnFocusProps } from '@hoc/checkOnFocusHOC';

import { Textarea, TextareaProps } from './Textarea';

interface Props extends TextareaProps {}

interface WithHOCProps extends Props, WithCheckOnFocusProps {}

@observer
class TextareaContainer extends React.Component<WithHOCProps> {
    @observable private currentValue: Nullable<string> = null;

    constructor(props: WithHOCProps) {
        super(props);

        makeObservable(this);
    }

    public render(): JSX.Element {
        const { value = '', onChange, onFocus, isOnFocus, onBlur, handleBlur, handleFocus, ...props } = this.props;

        const textareaValue = isNil(this.currentValue) ? (isNil(value) ? '' : value) : this.currentValue;

        return React.createElement(Textarea, {
            ...props,
            isActive: isOnFocus,
            value: textareaValue,
            onChange: this.handleChange,
            onFocus: this.handleFocus,
            onBlur: this.handleBlur,
        });
    }

    @action.bound
    protected handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        const { onChange } = this.props;

        if (onChange) {
            onChange(event);
        } else {
            this.currentValue = event.target.value;
        }
    }

    @autobind
    protected handleFocus(event: React.FocusEvent<HTMLTextAreaElement>) {
        const { onFocus, name, handleFocus } = this.props;

        event.target.name = name!;

        if (onFocus) {
            onFocus(event);
        }

        handleFocus();
    }

    @action.bound
    protected handleBlur(event: React.FocusEvent<HTMLTextAreaElement>) {
        const { onBlur, name, handleBlur } = this.props;

        event.target.name = name!;

        if (onBlur) {
            onBlur(event);
        }

        handleBlur();

        this.currentValue = null;
    }
}

export const WithHOCTextareaContained = checkOnFocusHOC<Props>(TextareaContainer);
