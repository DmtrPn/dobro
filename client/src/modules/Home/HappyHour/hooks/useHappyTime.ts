import { useState, useEffect } from 'react';

interface UseHappyTimeData {
    hours: string;
    minutes: string;
    seconds: string;
}

export function useHappyTime(): UseHappyTimeData {
    const [timeData, setTimeData] = useState<UseHappyTimeData>({ hours: '00', minutes: '00', seconds: '00' });
    let interval: any;

    function setTime(): void {
        const seconds = new Date().getSeconds();
        const minutes = new Date().getMinutes();
        const hours = new Date().getHours();
        let time = hours;
        if ((minutes === hours && seconds < hours) || minutes < hours) {
            time = hours > 0 ? hours - 1 : 23;
        }

        setTimeData({
            hours: (hours < 10 ? '0' : '') + time,
            minutes: (hours < 10 ? '0' : '') + time,
            seconds: (hours < 10 ? '0' : '') + time,
        });
    }

    useEffect(() => {
        interval = setInterval(() => {
            setTime();
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    return timeData;
}
