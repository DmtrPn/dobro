import React from 'react';
import autobind from 'autobind';
import isNil from 'lodash/isNil';
import { makeObservable, observable } from 'mobx';
import { observer } from 'mobx-react';

import { Nullable } from 'dobro-types/common';

import { checkOnFocusHOC, WithCheckOnFocusProps } from '@hoc/checkOnFocusHOC';

import { Textarea, TextareaProps } from './Textarea';

interface Props extends TextareaProps {
}

interface WithHOCProps extends Props, WithCheckOnFocusProps {}

@observer
class TextareaContainer extends React.Component<WithHOCProps> {

    @observable private currentValue: Nullable<string> = null;

    constructor(props: WithHOCProps) {
        super(props);

        makeObservable(this);

    }

    public render(): JSX.Element {
        const {
            value = '',
            onChange,
            onFocus,
            isOnFocus,
            onBlur,
            handleBlur,
            handleFocus,
            // @ts-ignore
            onCountryChange,
            ...props
        } = this.props;
        // const { currentValue } = this.state;

        const textareaValue = isNil(this.currentValue)
            ? isNil(value)
                ? ''
                : value
            : this.currentValue;

        return (
            React.createElement(Textarea, {
                ...props,
                isActive: isOnFocus,
                value: textareaValue,
                onChange: this.handleChange,
                onFocus: this.handleFocus,
                onBlur: this.handleBlur,
            })
        );
    }

    @autobind
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

    @autobind
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
