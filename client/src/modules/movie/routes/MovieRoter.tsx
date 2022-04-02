import * as React from 'react';
import { Route } from 'react-router';

import { Movie } from '../ui/MoviePage';

export function MovieRouter(): JSX.Element {
    return (
        <Route path={'/movie'} element={React.createElement(Movie)}>
        </Route>
    );
}
