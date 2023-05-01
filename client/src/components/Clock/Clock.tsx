import React, { RefObject } from 'react';

import style from './Clock.scss';

export interface ClockProps {}

interface Props extends ClockProps {
    hourRef: RefObject<HTMLDivElement>;
    minuteRef: RefObject<HTMLDivElement>;
    secondRef: RefObject<HTMLDivElement>;
}

export function Clock({ hourRef, minuteRef, secondRef }: Props): JSX.Element {
    return (
        <div className={style.root}>
            <div>
                <span className={style.sun} />
            </div>
            <div className={style.clock}>
                <div className={style.hour}>
                    <div ref={hourRef} className={style.hr} />
                </div>
                <div className={style.min}>
                    <div ref={minuteRef} className={style.mn} />
                </div>
                <div className={style.sec}>
                    <div ref={secondRef} className={style.sc} />
                </div>
            </div>
        </div>
    );
}
