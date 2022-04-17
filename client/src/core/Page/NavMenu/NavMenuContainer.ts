import React from 'react';
import { observer, inject } from 'mobx-react';
import { observable, action, makeObservable } from 'mobx';
import { State } from 'react-burger-menu';

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
            onMenuStateChange: this.onMenuStateChange,
            closeMenu: this.closeMenu,
        });
    }

    @action.bound
    private onMenuStateChange(state: State): void {
        this.menuOpen = state.isOpen;
    }

    @action.bound
    private closeMenu(): void {
        this.menuOpen = false;
    }

    private makeNavItems(): NavItemData[] {
        return [
            ...this.getCommonNavItems(),
            ...(this.props.appStore.isAuthorized ? this.getAuthUserNavItems() : [])
        ];
    }

    private getCommonNavItems(): NavItemData [] {
        return [
            {
                to: '/',
                title: 'Желания'
            }
        ];
    }

    private getAuthUserNavItems(): NavItemData[] {
        return [
            {
                to: '/movie',
                title: 'Фильмы',
            },
            // {
            //     to: '/affirmation',
            //     title: 'Аффирмации',
            // },
        ]
    }
}

export const NavMenuContainer = inject<Props, StoreProps>(...injectableStores)(Component);
