import React from 'react';
import { Menu as UiMenu, MenuItemProps } from 'semantic-ui-react';

import style from './Menu.scss';

export interface MenuItemData {
    name: string;
    content: React.ReactNode;
}

export interface MenuEventData extends MenuItemProps {
    name: string;
}

export interface MenuProps {
    items: MenuItemData[];
    selectedNames: string[];
    onMenuItemClick(event: React.MouseEvent<HTMLAnchorElement>, data: MenuEventData): void;
}

export function Menu({
    items,
    selectedNames,
    onMenuItemClick,
}: MenuProps): JSX.Element {
    const selected = new Set(selectedNames);
    return (
        <UiMenu
            secondary
            stackable
            color={'purple'}
            className={style.root}
        >
            {items.map(data => (
                <UiMenu.Item
                    {...data}
                    key={data.name}
                    className={style.item}
                    active={selected.has(data.name)}
                    // @ts-ignore
                    onClick={onMenuItemClick}
                />
            ))}
        </UiMenu>
    );
}
