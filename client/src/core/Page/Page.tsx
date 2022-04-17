import * as React from 'react';

import * as style from './Page.scss';
import './reset.scss';

import { Router } from '@core/Router';
import { NavMenu } from './NavMenu';

// import { Header } from './Header';

export interface PageProps {
    children?: React.ReactNode;
}

export function Page(): JSX.Element {
    return (
    <div className={style.root}>
        {/*<Header />*/}
        <NavMenu />
        <div className={style.content}>
            <Router />
        </div>
    </div>);
}
