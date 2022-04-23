import { Module } from '@nestjs/common';

import { MovieController } from './controllers/movie';
import { AffirmationController } from './controllers/affirmation';
import { MovieRatingController } from './controllers/movie-rating';

@Module({
    controllers: [
        MovieController,
        AffirmationController,
        MovieRatingController,
    ],
})
export class CatalogModule {}
