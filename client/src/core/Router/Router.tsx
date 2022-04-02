import * as React from 'react';
import { Routes, Route } from 'react-router';

import { locations } from './locations';
import { NotFound } from '@modules/notFound';
import { DreamRouter } from '@dream/routes/DreamRoter';
import { MovieRouter } from '@modules/movie/routes/MovieRoter';

export function Router(): JSX.Element {
    return (
        <Routes>
            {locations.map(location =>
                <Route
                    key={location.url}
                    path={location.url}
                    element={React.createElement(location.Component)}
                />,
            )}
            {DreamRouter()}
            {MovieRouter()}
            <Route path={'*'} element={React.createElement(NotFound)} />
        </Routes>
    );
}
