import React, { RefObject } from 'react';
// import autobind from 'autobind';
// import { observer, inject } from 'mobx-react';

import { HomePage } from './Home';

interface Props {
}

// interface StoreProps {
// }

// const injectableStores: (keyof StoreProps)[] = [
// ];

// @observer
export class HomeContainer extends React.Component<Props> {
    private rootRef: RefObject<HTMLDivElement> = React.createRef();

    public componentDidMount() {
        var boxshadow = "";

        for(var i = 0; i <= 1500; i++){
            const px = Math.random() < 0.5 ? "-" : "";
            const py = Math.random() < 0.5 ? "-" : "";
            const x = Math.floor((Math.random() * window.innerWidth) + 1);
            const y = Math.floor((Math.random() * window.innerHeight) + 1);
            const s = Math.floor((Math.random() * 2) - 1);
            boxshadow += px+x+"px "+py+y+"px 0 "+s+"px rgba(177, 198, 219, 1),";
        }

        boxshadow = boxshadow.slice(0, -1);

        this.rootRef.current!.style.boxShadow = boxshadow;
        // document.getElementById('stars')!.style.boxShadow = boxshadow;
        //
        // setTime();
        // rotateClock();
        //
        // setInterval(function() {
        //     rotateClock();
        //     setTime();
        // }, 1000);
    }

    public render() {
        return React.createElement(HomePage, {
            rootRef: this.rootRef
        });
    }
}

// export const HomeContainer = inject<Props, StoreProps>(...injectableStores)(Component);
