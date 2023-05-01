import React from 'react';
import { Item as SemantiItem } from 'semantic-ui-react';

import style from './Item.scss';

export interface ItemProps {
    imgSrc?: string;
    header: React.ReactNode;
    meta?: React.ReactNode;
    description: React.ReactNode;
    extra?: React.ReactNode;
}

export function Item({ imgSrc, header, meta, description, extra }: ItemProps): JSX.Element {
    return (
        <SemantiItem.Group>
            <SemantiItem className={style.root}>
                {imgSrc && <SemantiItem.Image size="tiny" src={imgSrc} />}
                <SemantiItem.Content>
                    <SemantiItem.Header>{header}</SemantiItem.Header>
                    {meta && <SemantiItem.Meta>{meta}</SemantiItem.Meta>}
                    <SemantiItem.Description>{description}</SemantiItem.Description>
                    {extra && <SemantiItem.Extra>{extra}</SemantiItem.Extra>}
                </SemantiItem.Content>
            </SemantiItem>
        </SemantiItem.Group>
    );
}
