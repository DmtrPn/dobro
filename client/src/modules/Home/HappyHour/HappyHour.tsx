import React from 'react';

import style from './HappyHour.scss';

export interface HappyHourProps {
}

interface Props extends HappyHourProps {
    hours: string;
    minutes: string;
    seconds: string;
}

export function HappyHour({
    hours,
    minutes,
    seconds,
}: Props): JSX.Element {
    return (
        <div className={style.root}>
            <ul className={style.happyClock}>
                <li className={style.time}>{hours}</li>
                <li className={style.separator}>:</li>
                <li className={style.time}>{minutes}</li>
                <li className={style.separator}>:</li>
                <li className={style.time}>{seconds}</li>
            </ul>
        </div>
    );
}
