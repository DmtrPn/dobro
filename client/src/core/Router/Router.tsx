import React from 'react';
import { Routes, Navigate, Route } from 'react-router';

import { locations } from './locations';
import { NotFound } from '@modules/notFound';
import { DreamRouter } from '@dream/routes/DreamRoter';
import { MovieRouter } from '@movie/routes/MovieRoter';
import { AffirmationRouter } from '@affirmation/routes/AffirmationRoter';

export function Router(): JSX.Element {
    return (
        <Routes>
            {locations.map(location => (
                <Route key={location.url} path={location.url} element={React.createElement(location.Component)} />
            ))}
            <Route path="/" element={<Navigate to="/movie" replace />} />
            {DreamRouter()}
            {MovieRouter()}
            {AffirmationRouter()}
            <Route path={'*'} element={React.createElement(NotFound)} />
        </Routes>
    );
}
