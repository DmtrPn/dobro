import React from 'react';
import { observable, action, makeObservable } from 'mobx';
import { observer } from 'mobx-react';

import { HappyHour, HappyHourProps } from './HappyHour';

interface Props extends HappyHourProps {}

@observer
export class HappyHourContainer extends React.Component<Props> {
    @observable private hours = '00';
    @observable private minutes = '00';
    @observable private seconds = '00';
    private interval!: any;

    constructor(props: Props) {
        super(props);

        makeObservable(this);
    }

    public componentDidMount() {
        this.setTime();

        this.interval = setInterval(() => {
            this.setTime();
        }, 1000);
    }

    public componentWillUnmount(): void {
        clearInterval(this.interval);
    }

    public render() {
        return React.createElement(HappyHour, {
            hours: this.hours,
            minutes: this.minutes,
            seconds: this.seconds,
        });
    }

    @action.bound
    private setTime(): void {
        const seconds = new Date().getSeconds();
        const minutes = new Date().getMinutes();
        const hours = new Date().getHours();
        let time = hours;
        if ((minutes === hours && seconds < hours) || minutes < hours) {
            time = hours > 0 ? hours - 1 : 23;
        }

        this.hours = (hours < 10 ? '0' : '') + time;
        this.minutes = (hours < 10 ? '0' : '') + time;
        this.seconds = (hours < 10 ? '0' : '') + time;
    }
}
