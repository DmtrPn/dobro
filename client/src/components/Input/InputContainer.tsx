import React from 'react';
import autobind from 'autobind';
import isNil from 'lodash/isNil';

import { Nullable } from 'dobro-types/common';

import { checkOnFocusHOC, WithCheckOnFocusProps } from '@hoc/checkOnFocusHOC';
import { Input, InputProps } from './Input';

export interface Props extends InputProps {
    autoFocus?: boolean;
}

interface WithHOCProps extends Props, WithCheckOnFocusProps {}

interface State {
    currentValue: Nullable<string | number>;
}

class InputContainer extends React.PureComponent<WithHOCProps, State> {

    public state: State = {
        currentValue: null,
    };

    protected input!: HTMLElement;

    public componentDidMount(): void {
        if (this.props.autoFocus) {
            this.input.focus();
        }
    }

    public render() {
        const {
            value,
            onChange,
            onBlur,
            isOnFocus,
            onFocus,
            handleFocus,
            handleBlur,
            placeholder,
            title,
            autoComplete,
            ...props
        } = this.props;
        const { currentValue } = this.state;

        const inputValue = isNil(currentValue)
            ? isNil(value)
                ? ''
                : value
            : currentValue;

        return React.createElement(Input, {
            ...props,
            title,
            autoComplete: autoComplete || 'off',
            placeholder: !!title ? undefined : placeholder,
            value: inputValue,
            onChange: this.handleInputChange,
            onBlur: this.handleInputBlur,
            onFocus: this.handleInputFocus,
        });
    }

    @autobind
    protected inputRef(input: HTMLElement): void {
        this.input = input;
    }

    @autobind
    protected handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { onChange } = this.props;

        if (onChange) {
            onChange(event);
        } else {
            this.setState({
                currentValue: event.target.value,
            });
        }
    }

    @autobind
    protected async handleInputFocus(event: React.FocusEvent<HTMLInputElement>) {
        const { onFocus, name, handleFocus } = this.props;

        event.target.name = name!;

        handleFocus();

        if (onFocus) {
            await onFocus(event);
        }
    }

    @autobind
    protected async handleInputBlur(event: React.FocusEvent<HTMLInputElement>) {
        const { onBlur, name, handleBlur } = this.props;

        event.target.name = name!;

        handleBlur();

        this.setState({
            currentValue: null,
        });

        if (onBlur) {
            await onBlur(event);
        }
    }
}

export const WithHOCInputContainer = checkOnFocusHOC<Props>(InputContainer);
