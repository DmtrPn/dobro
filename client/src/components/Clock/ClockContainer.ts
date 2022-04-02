import React, { RefObject } from 'react';
import autobind from 'autobind';

import { Clock, ClockProps } from './Clock';

interface Props extends ClockProps {
}

export class ClockContainer extends React.Component<Props> {

    private hourRef: RefObject<HTMLDivElement> = React.createRef();
    private minuteRef: RefObject<HTMLDivElement> = React.createRef();
    private secondRef: RefObject<HTMLDivElement> = React.createRef();

    public componentDidMount() {
        // this.setTime();
        this.rotateClock();

        setInterval(() => {
            this.rotateClock();
            // this.setTime();
        }, 1000);
    }

    public render() {
        return React.createElement(Clock, {
            hourRef: this.hourRef,
            minuteRef: this.minuteRef,
            secondRef: this.secondRef,
        });
    }

    // @autobind
    // private setTime(): void {
    //     const seconds = new Date().getSeconds();
    //     const minutes = new Date().getMinutes();
    //     const hours = new Date().getHours();
    //     let time = hours;
    //     if (minutes === hours && seconds < hours || minutes < hours) {
    //         time = hours > 0 ? hours - 1 : 23;
    //     }
    //
    //     this.secondRef.current!.innerHTML = (hours < 10 ? '0' : '') + time;
    //     this.minuteRef.current!.innerHTML = (hours < 10 ? '0' : '') + time;
    //     this.hourRef.current!.innerHTML = (hours < 10 ? '0' : '') + time;
    // }
    
    @autobind
    private rotateClock() {
        const deg = 6;

        const day = new Date();
        const hh = day.getHours() * 30;
        const mm = day.getMinutes() * deg;
        const ss = day.getSeconds() * deg;

        this.hourRef.current!.style.transform = `rotateZ(${hh + (mm / 12)}deg)`;
        this.minuteRef.current!.style.transform = `rotateZ(${mm}deg)`;
        this.secondRef.current!.style.transform = `rotateZ(${ss}deg)`;
    }
}
