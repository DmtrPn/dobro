import React, { RefObject } from 'react';

import { StarBackground } from './StarBackground';

interface Props {
    starCount?: number;
}

export class StarBackgroundContainer extends React.Component<Props> {
    private rootRef: RefObject<HTMLDivElement> = React.createRef();

    public componentDidMount(): void {
        const { starCount = 1500 } = this.props;
        let boxshadow = "";

        for(var i = 0; i <= starCount; i++){
            const px = Math.random() < 0.5 ? "-" : "";
            const py = Math.random() < 0.5 ? "-" : "";
            const x = Math.floor((Math.random() * window.innerWidth) + 1);
            const y = Math.floor((Math.random() * window.innerHeight) + 1);
            const s = Math.floor((Math.random() * 2) - 1);
            boxshadow += px+x+"px "+py+y+"px 0 "+s+"px rgba(177, 198, 219, 1),";
        }

        boxshadow = boxshadow.slice(0, -1);

        this.rootRef.current!.style.boxShadow = boxshadow;
    }

    public render() {
        return React.createElement(StarBackground, {
            rootRef: this.rootRef
        });
    }
}
