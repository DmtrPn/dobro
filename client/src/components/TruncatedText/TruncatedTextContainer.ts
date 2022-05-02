import React from 'react';
import { observable, action, makeObservable } from 'mobx';
import { observer } from 'mobx-react';

import { TruncatedText, TruncatedTextProps } from './TruncatedText';

interface Props extends TruncatedTextProps {
}

@observer
export class TruncatedTextContainer extends React.Component<Props> {

    @observable private isTruncated: boolean = false;
    @observable private isOpen: boolean = false;

    constructor(props: Props) {
        super(props);
        makeObservable(this);
    }

    public render() {
        const { text, maxLine, additionalClassName, splitByLetters } = this.props;
        return React.createElement(TruncatedText, {
            text,
            maxLine,
            additionalClassName,
            splitByLetters,
            isTruncated: this.isTruncated,
            isOpen: this.isOpen,
            toggleIsOpen: this.toggleIsOpen,
            onTruncate: this.onTruncate,
        });
    }

    @action.bound
    protected toggleIsOpen() {
        this.isOpen = !this.isOpen;
    }

    @action.bound
    protected onTruncate(isTruncated: boolean) {
        if (!this.isTruncated && isTruncated) {
            this.isTruncated = isTruncated;
        }
    }
}
