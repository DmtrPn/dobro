import React from 'react';
import ReactSelect, { components, Props as ReactSelectProps } from 'react-select';
import classnames from 'classnames';

import style from './Select_.scss';
import commonStyle from '@components/mixins/commonStyles.scss';

import { Nullable } from 'dobro-types/common';

import { Icon, IconType } from '@components/Icon';
import { FieldTitle, FieldTitleModificator } from '@components/FieldTitle';

import { OptionType } from './types';

// https://github.com/JedWatson/react-select#props
export interface SelectProps extends Omit<ReactSelectProps, 'onChange'> {
    options: OptionType[];
    title?: string;
    menuIsOpen?: boolean;
    value?: Nullable<OptionType>;
    name?: string;
    placeholder?: string;
    disabled?: boolean;
    isSearchable?: boolean;
    isClearable?: boolean;
    onMenuOpen?(): void;
    onChange(selectedItem: OptionType, name?: string): void;
}

interface Props extends SelectProps {
    isOnFocus: boolean;
    onFocus(): void;
    onBlur(): void;
}
export function Select({
    options,
    title,
    value,
    name,
    disabled,
    placeholder = '-',
    isSearchable = true,
    isClearable = false,
    menuIsOpen,
    onFocus,
    onMenuOpen,
    onBlur,
    onChange,
}: Props): JSX.Element {

    const handleChange = (selectedItem: any) => onChange(selectedItem, name);

    return (
        <div
            className={classnames([
                style.component_select__root,
                commonStyle.font_text,
            ])}
        >
            {title && (
                <FieldTitle
                    modificators={[FieldTitleModificator.WithPadding]}
                    title={title}
                />
            )}
            <ReactSelect
                menuIsOpen={menuIsOpen}
                placeholder={placeholder}
                options={options}
                value={value}
                onChange={handleChange}
                isSearchable={isSearchable}
                isClearable={isClearable}
                isDisabled={disabled}
                noOptionsMessage={noOptionsMessage}
                className={style.component_select__root}
                classNamePrefix={'react-select'}
                components={{ DropdownIndicator, Option }}
                onFocus={onFocus}
                onBlur={onBlur}
                onMenuOpen={onMenuOpen}
            />
        </div>
    );
}

export const DropdownIndicator = (props: any) => {
    return (
        // @ts-ignore
        <components.DropdownIndicator {...props}>
            <div className={style.component_select__open_icon}>
                <Icon type={IconType.ARROW_DOWN} />
            </div>
        </components.DropdownIndicator>
    );
};

export const Option = (props: any) => {
    return (
        <div className={classnames([
            props.data.isDisabled && style.component_select__option_disabled,
        ])}>
            <components.Option {...props} />
        </div>
    );
};

export function noOptionsMessage({ inputValue }: { inputValue: string }): string {
    return inputValue === ''
        ? 'Введите значение'
        : 'Ничего не найдено';

}
