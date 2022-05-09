import React from 'react';

import { HomePage } from '@modules/Home';
import { WishPage } from '@modules/Wish';
import { AuthPage } from '@modules/auth';
// import { DreamPage } from '@modules/dream/ui/DreamPage';

export interface PageLocation {
    url: string;
    path: string;
    Component: React.ComponentType<any>;
}

export const locations: PageLocation[] = [
    {
        url: '/',
        path: '/',
        Component: HomePage,
    },
    {
        url: '/wish',
        path: '/wish',
        Component: WishPage,
    },
    {
        url: '/login',
        path: '/login',
        Component: AuthPage,
    },
];
