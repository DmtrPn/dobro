import React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import classnames from 'classnames';

import style from './Link.scss';
import commonStyle from '@components/mixins/commonStyles.scss';

export interface NavMenuProps extends NavLinkProps {
}

export function Link({
    children,
    className,
    ...props
}: NavMenuProps): JSX.Element {
    return (<NavLink
        className={({ isActive }) => classnames([
            style.link,
            commonStyle.font_title,
            isActive && style.link_active,
        ])}
        {...props}
    >
        {children}
    </NavLink>);
}
