import React, { useState } from 'react';

export interface UseTextareaValueParams {
    initialValue?: string;
}

export interface UseTextareaValueData {
    value: string;
    onChange(event: React.ChangeEvent<HTMLTextAreaElement>): void;
}

export function useTextareaValue({ initialValue = '' }: UseTextareaValueParams = {}): UseTextareaValueData {
    const [value, setValue] = useState<string>(initialValue);

    function onChange({ target }: React.ChangeEvent<HTMLTextAreaElement>): void {
        setValue(target.value);
    }

    return { value, onChange };
}
