import React from 'react';
import { Button, Sidebar, Menu } from 'semantic-ui-react';

import style from './NavMenu.scss';
import './Menu_.scss';

import { Link } from '@components/Link';
import { SemanticIcon } from '@components/Icon';
import { SaveButton } from '@components/ActionButtons/SaveButton';
import { CancelButton } from '@components/ActionButtons/CancelButton';

export interface NavMenuProps {}

export interface NavItemData {
    to: string;
    title: string;
}

interface Props extends NavMenuProps {
    menuOpen: boolean;
    isAuthorized: boolean;
    items: NavItemData[];
    onOpenMenuClick(): void;
    closeMenu(): void;
    onLoginClick(): void;
    onLogoutClick(): void;
}

export function NavMenu({
    menuOpen,
    isAuthorized,
    items,
    onOpenMenuClick,
    closeMenu,
    onLoginClick,
    onLogoutClick,
}: Props): JSX.Element {
    return (
        <div className={style.root}>
            {!menuOpen && (
                <div className={style.openButton}>
                    <Button basic icon circular onClick={onOpenMenuClick}>
                        <SemanticIcon name={'bars'} />
                    </Button>
                </div>
            )}
            <Sidebar
                as={Menu}
                animation="overlay"
                icon="labeled"
                inverted
                onHide={closeMenu}
                vertical
                visible={menuOpen}
                width="thin"
            >
                <div className={style.menu}>
                    {items.map(({ title, to }) => (
                        <Link key={`${to}_${title}`} to={to} onClick={closeMenu}>
                            {title}
                        </Link>
                    ))}

                    <div className={style.login}>
                        {isAuthorized ? (
                            <CancelButton onCancelClick={onLogoutClick} label={'Выйти'} />
                        ) : (
                            <SaveButton onSaveClick={onLoginClick} label={'Войти'} />
                        )}
                    </div>
                </div>
            </Sidebar>
        </div>
    );
}
