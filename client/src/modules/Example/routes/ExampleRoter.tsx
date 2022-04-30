import React from 'react';
import { Route } from 'react-router';

import { ExamplePage } from '../ui/ExamplePage';

export function ExampleRouter(): JSX.Element {
    return (
        <Route path={'/example'} element={React.createElement(ExamplePage)}>
            <Route path={'subpage'} element={React.createElement(ExamplePage)} />
        </Route>
    );
}
