export declare type Value = string | number | null | undefined;
// export type SingleValue<Option> = Option | null;

export interface OptionType<V = Value> {
    value: V;
    label: string;
    isDisabled?: boolean;
    [key: string]: any;
}

export const NotSelectedOptionMasculine: OptionType = {
    value: null,
    label: 'Не выбран',
};

export const NotSelectedOptionFeminine: OptionType = {
    value: null,
    label: 'Не выбрана',
};

export const AnyOptionMasculine: OptionType = {
    value: null,
    label: 'Любой',
};

export const AnyOptionFeminine: OptionType = {
    value: null,
    label: 'Любая',
};

export const AnyOptionNeutral: OptionType = {
    value: null,
    label: 'Все',
};
