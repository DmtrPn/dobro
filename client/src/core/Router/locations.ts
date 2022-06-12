import React from 'react';

import { HomePage } from '@modules/Home';
import { AuthPage } from '@modules/auth';
// import { DreamPage } from '@modules/dream/ui/DreamPage';

export interface PageLocation {
    url: string;
    path: string;
    Component: React.ComponentType<any>;
}

export const locations: PageLocation[] = [
    {
        url: '/wish',
        path: '/wish',
        Component: HomePage,
    },
    {
        url: '/login',
        path: '/login',
        Component: AuthPage,
    },
];
