import React from 'react';
import { Input as UIInput } from 'semantic-ui-react';

import style from './Input.scss';

import { InputProps } from './Input';

interface Props extends Omit<InputProps, 'modifiers' | 'size'> {}

export function SearchInput({ placeholder = 'Поиск...', ...props }: Props): JSX.Element {
    return (
        <div className={style.root}>
            <UIInput icon="search" placeholder={placeholder} {...props} />
        </div>
    );
}
