import React from 'react';
import classnames from 'classnames';

import style from './MoviePage.scss';

import { SaveButton } from '@components/ActionButtons/SaveButton';
import { Menu, MenuEventData, MenuItemData } from '@components/Menu';
import { SearchInput } from '@components/Input';

import { MovieForm } from './MovieForm';
import { Movie } from './Movie';

export interface MoviePageProps {}

interface Props extends MoviePageProps {
    canEdit: boolean;
    addMode: boolean;
    ids: string[];
    searchValue: string;
    menuItems: MenuItemData[];
    selectedMenuItems: string[];
    onAddClick(): void;
    onFinishCreate(): void;
    onMenuItemClick(event: React.MouseEvent<HTMLAnchorElement>, data: MenuEventData): void;
    onSearchInputChange(event: React.ChangeEvent<HTMLInputElement>): void;
}

export function MoviePage({
    ids,
    addMode,
    menuItems,
    searchValue,
    selectedMenuItems,
    canEdit,
    onAddClick,
    onFinishCreate,
    onMenuItemClick,
    onSearchInputChange,
}: Props): JSX.Element {
    return (
        <div className={style.root}>
            <div className={style.topLine}>
                <Menu items={menuItems} selectedNames={selectedMenuItems} onMenuItemClick={onMenuItemClick} />
                <SearchInput value={searchValue} onChange={onSearchInputChange} />
            </div>
            <div className={style.cards}>
                {ids.map(id => (
                    <div key={id} className={classnames([style.card])}>
                        <Movie id={id} />
                    </div>
                ))}
            </div>
            {canEdit &&
                (addMode ? (
                    <div className={style.card}>
                        <MovieForm onFinish={onFinishCreate} />
                    </div>
                ) : (
                    <SaveButton onSaveClick={onAddClick} label={'Добавить'} />
                ))}
        </div>
    );
}
