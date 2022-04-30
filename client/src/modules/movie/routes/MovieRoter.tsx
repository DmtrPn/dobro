import React from 'react';
import { Route } from 'react-router';

import { MoviePage } from '../ui/MoviePage';

export function MovieRouter(): JSX.Element {
    return (
        <Route path={'/movie'} element={React.createElement(MoviePage)}>
        </Route>
    );
}
