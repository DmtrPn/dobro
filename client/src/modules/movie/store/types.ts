import { OptionType } from '@components/Select/types';
import { MenuItemData } from '@components/Menu';

export const enum MovieFilterName {
    Viewed = 'viewed',
    New = 'new',
}

export const filterMenuData: MenuItemData[] = [
    {
        name: MovieFilterName.New,
        content: 'Новые',
    },
    {
        name: MovieFilterName.Viewed,
        content: 'Просмотренные',
    },
];

export const movieRatingOptions: OptionType<number>[] = [
    {
        value: 10,
        label: '10',
    },
    {
        value: 9,
        label: '9',
    },
    {
        value: 8,
        label: '8',
    },
    {
        value: 7,
        label: '7',
    },
    {
        value: 6,
        label: '6',
    },
    {
        value: 5,
        label: '5',
    },
    {
        value: 4,
        label: '4',
    },
    {
        value: 3,
        label: '3',
    },
    {
        value: 2,
        label: '2',
    },
    {
        value: 1,
        label: '1',
    },
    {
        value: 0,
        label: '0',
    },
];
