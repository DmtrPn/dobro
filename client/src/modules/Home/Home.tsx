import * as React from 'react';

import style from './Home.scss';

import { StarBackground } from '@components/StarBackground';
import { Clock } from '@components/Clock';

interface Props {
}

export function HomePage({
}: Props): JSX.Element {
    return (
        <div className={style.root}>
            <StarBackground />
            <Clock />
        </div>
    );
}
