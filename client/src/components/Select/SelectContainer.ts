import React from 'react';
import find from 'lodash/find';
import autobind from 'autobind';
import isUndefined from 'lodash/isUndefined';

import { Nullable } from 'dobro-types/common';

import { Select, SelectProps } from './Select';
import { OptionType } from './types';
import { checkOnFocusHOC, WithCheckOnFocusProps } from '../../HOC/checkOnFocusHOC';

export interface SelectContainerProps extends SelectProps {
    selectedValue?: Nullable<string | number>;
    name?: string;
    onChange(params: Nullable<OptionType>, name?: string): void;
}

interface WithFixedProps extends SelectContainerProps, WithCheckOnFocusProps {}

class SelectContainer extends React.Component<WithFixedProps> {
    public render() {
        const {
            selectedValue,
            placeholder,
            name,
            onChange,
            title,
            handleBlur,
            handleFocus,
            isOnFocus,
            onMenuOpen,
            value: propsValue = null,
            ...props
        } = this.props;

        const value = !isUndefined(selectedValue) ? this.makeValue() : propsValue;

        return React.createElement(Select, {
            ...props,
            title,
            value,
            isOnFocus,
            placeholder: !title ? (isOnFocus ? 'Поиск' : placeholder) : '',
            onChange: this.handleChange,
            onFocus: handleFocus,
            onBlur: handleBlur,
            onMenuOpen: this.handleMenuOpen,
        });
    }

    @autobind
    protected handleChange(params: OptionType) {
        const { onChange, name } = this.props;

        onChange(params, name);
    }

    @autobind
    protected async handleMenuOpen(): Promise<void> {
        await this.props.onMenuOpen?.();
    }

    private makeValue(): OptionType {
        const { selectedValue, options } = this.props;

        return find(options, option => option.value === selectedValue) ?? null!;
    }
}

export const WithCheckOnFocusSelectContainer = checkOnFocusHOC<SelectContainerProps>(SelectContainer);
