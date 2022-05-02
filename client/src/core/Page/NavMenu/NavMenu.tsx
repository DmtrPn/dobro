import React from 'react';
import { stack as Menu, State } from 'react-burger-menu';

import style from './NavMenu.scss';
import './Menu_.scss';

import { Link } from '@components/Link';

export interface NavMenuProps {
}

export interface NavItemData {
    to: string;
    title: string;
}

interface Props extends NavMenuProps {
    menuOpen: boolean;
    items: NavItemData[];
    onMenuStateChange(state: State): void;
    closeMenu(): void;
}

export function NavMenu({
    menuOpen,
    items,
    onMenuStateChange,
    closeMenu,
}: Props): JSX.Element {
    return (
        <div className={style.root}>
            <Menu
                isOpen={menuOpen}
                onStateChange={onMenuStateChange}
            >
                {items.map(({ title, to }) =>
                    <Link
                        key={`${to}_${title}`}
                        to={to}
                        onClick={closeMenu}
                    >
                        {title}
                    </Link>)}
            </Menu>
        </div>
    );
}
