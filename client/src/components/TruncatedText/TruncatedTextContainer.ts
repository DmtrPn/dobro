import React, { RefObject } from 'react';
import { observable, action, makeObservable } from 'mobx';
import { observer } from 'mobx-react';

import { TruncatedText, TruncatedTextProps } from './TruncatedText';

interface Props extends TruncatedTextProps {
}

@observer
export class TruncatedTextContainer extends React.Component<Props> {

    @observable private isTruncated: boolean = false;
    @observable private isOpen: boolean = false;
    @observable private truncatedTextRef: RefObject<HTMLDivElement> = React.createRef();

    constructor(props: Props) {
        super(props);
        makeObservable(this);
    }

    @action
    public componentDidMount(): void {
        const offsetHeight = this.truncatedTextRef.current?.offsetHeight || 0;
        const scrollHeight = this.truncatedTextRef.current?.scrollHeight || 0;

        this.isTruncated = scrollHeight > offsetHeight;
    }

    public render() {
        const { text, maxLine } = this.props;
        return React.createElement(TruncatedText, {
            text,
            maxLine,
            truncatedTextRef: this.truncatedTextRef,
            isTruncated: this.isTruncated,
            isOpen: this.isOpen,
            toggleIsOpen: this.toggleIsOpen,
        });
    }

    @action.bound
    private toggleIsOpen() {
        this.isOpen = !this.isOpen;
    }
}
