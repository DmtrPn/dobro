import React from 'react';
import { Route } from 'react-router';

import { Affirmation } from '../ui/AffirmationPage';

export function AffirmationRouter(): JSX.Element {
    return <Route path={'/affirmation'} element={React.createElement(Affirmation)}></Route>;
}
