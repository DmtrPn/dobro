import React from 'react';
import { Button, Icon,  Sidebar, Menu } from 'semantic-ui-react';

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
    onOpenMenuClick(): void;
    closeMenu(): void;
}

export function NavMenu({
    menuOpen,
    items,
    onOpenMenuClick,
    closeMenu,
}: Props): JSX.Element {
    return (
        <div className={style.root}>
            <div className={style.openButton}>
                <Button
                    basic
                    icon
                    onClick={onOpenMenuClick}
                >
                    <Icon
                        name={'bars'}
                    />
                </Button>
            </div>
            <Sidebar
                as={Menu}
                animation='overlay'
                icon='labeled'
                inverted
                onHide={onOpenMenuClick}
                vertical
                visible={menuOpen}
                width='thin'
            >
                <div className={style.menu}>
                    {items.map(({ title, to }) =>
                        <Link
                            key={`${to}_${title}`}
                            to={to}
                            onClick={closeMenu}
                        >
                            {title}
                        </Link>)}
                </div>
            </Sidebar>
        </div>
    );
}
