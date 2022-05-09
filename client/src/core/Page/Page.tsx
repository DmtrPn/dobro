import React from 'react';

import style from './Page.scss';
import './reset.scss';
import './ResetExternal_.scss';

import { Router } from '@core/Router';
import { NavMenu } from './NavMenu';

export function Page(): JSX.Element {
    return (
        <div className={style.root}>
            <NavMenu />
            <div className={style.content}>
                <Router />
            </div>
        </div>
    );
}
