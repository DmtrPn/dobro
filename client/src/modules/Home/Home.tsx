import * as React from 'react';

import style from './Home.scss';
import { RefObject } from 'react';

interface Props {
    rootRef: RefObject<HTMLDivElement>;
}

export function HomePage({
    rootRef,
}: Props): JSX.Element {
    return (
        <div className={style.root}>
            <div  ref={rootRef} className={style.stars} />
        </div>
    );
}
