import React from 'react';
import { observer, inject } from 'mobx-react';
import { observable, action, makeObservable } from 'mobx';

import { NavMenu, NavMenuProps, NavItemData } from './NavMenu';
import { AppStore } from '@store/App/AppStore';
import { authService } from '@store/App/service/authService';

interface Props extends NavMenuProps {}

interface StoreProps {
    appStore: AppStore;
}

const injectableStores: (keyof StoreProps)[] = [AppStore.Name];

@observer
class Component extends React.Component<Props & StoreProps> {
    @observable private menuOpen = false;

    constructor(props: Props & StoreProps) {
        super(props);

        makeObservable(this);
    }

    public render() {
        return React.createElement(NavMenu, {
            isAuthorized: this.props.appStore.isAuthorized,
            menuOpen: this.menuOpen,
            items: this.makeNavItems(),
            onOpenMenuClick: this.onOpenMenuClick,
            closeMenu: this.closeMenu,
            onLoginClick: this.onLoginClick,
            onLogoutClick: this.onLogoutClick,
        });
    }

    @action.bound
    private onOpenMenuClick(): void {
        this.menuOpen = true;
    }

    @action.bound
    private closeMenu(): void {
        this.menuOpen = false;
    }

    @action.bound
    private onLoginClick(): void {
        window.location.pathname = '/login';
    }

    @action.bound
    private async onLogoutClick(): Promise<void> {
        await authService.logout();
    }

    private makeNavItems(): NavItemData[] {
        return [
            ...this.getCommonNavItems(),
            ...(this.props.appStore.authUser?.isAdmin ? this.getAdminUserNavItems() : []),
        ];
    }

    private getCommonNavItems(): NavItemData[] {
        return [
            {
                to: '/wish',
                title: 'Желания',
            },
            {
                to: '/movie',
                title: 'Фильмы',
            },
        ];
    }

    private getAdminUserNavItems(): NavItemData[] {
        return [
            {
                to: '/affirmation',
                title: 'Аффирмации',
            },
        ];
    }
}

export const NavMenuContainer = inject<Props, StoreProps>(...injectableStores)(Component);
