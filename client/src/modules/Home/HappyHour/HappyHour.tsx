import React from 'react';

import style from './HappyHour.scss';

import { useHappyTime } from './hooks/useHappyTime';

export interface HappyHourProps {}

export function HappyHour({}: HappyHourProps): JSX.Element {
    const { hours, minutes, seconds } = useHappyTime();
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
