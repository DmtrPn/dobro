import React, { useState } from 'react';

interface UseCheckOnFocusParams {
    name?: string;
    onFocus?(event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>): void;
    onBlur?(event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>): void;
}

interface UseCheckOnFocusData {
    isOnFocus: boolean;
    onFocus(event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>): void;
    onBlur(event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>): void;
}

export function useCheckOnFocus(params: UseCheckOnFocusParams = {}): UseCheckOnFocusData {
    const [isOnFocus, setIsOnFocus] = useState(false);

    function onFocus(event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        setIsOnFocus(true);
        if (params.name) {
            event.target.name = params.name;
        }
        params.onFocus?.(event);
    }

    function onBlur(event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        setIsOnFocus(false);
        if (params.name) {
            event.target.name = params.name;
        }
        params.onFocus?.(event);
    }

    return {
        isOnFocus,
        onFocus,
        onBlur,
    };
}
