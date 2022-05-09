import React from 'react';
import { observer, inject } from 'mobx-react';
import { observable, action, makeObservable } from 'mobx';

import { NavMenu, NavMenuProps, NavItemData } from './NavMenu';
import { AppStore } from '@store/App/AppStore';

interface Props extends NavMenuProps {
}

interface StoreProps {
    appStore: AppStore;
}

const injectableStores: (keyof StoreProps)[] = [
    AppStore.Name,
];

@observer
class Component extends React.Component<Props & StoreProps> {

    @observable private menuOpen = false;

    constructor(props: Props & StoreProps) {
        super(props);

        makeObservable(this);
    }

    public render() {
        return React.createElement(NavMenu, {
            menuOpen: this.menuOpen,
            items: this.makeNavItems(),
            onOpenMenuClick: this.onOpenMenuClick,
            closeMenu: this.closeMenu,
        });
    }

    @action.bound
    private onOpenMenuClick(): void {
        this.menuOpen = !this.menuOpen;
    }

    @action.bound
    private closeMenu(): void {
        this.menuOpen = false;
    }

    private makeNavItems(): NavItemData[] {
        return [
            ...this.getCommonNavItems(),
            ...(this.props.appStore.authUser?.isAdmin ? this.getAdminUserNavItems() : []),
        ];
    }

    private getCommonNavItems(): NavItemData [] {
        return [
            {
                to: '/',
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
            // {
            //     to: '/affirmation',
            //     title: 'Аффирмации',
            // },
        ];
    }
}

export const NavMenuContainer = inject<Props, StoreProps>(...injectableStores)(Component);
