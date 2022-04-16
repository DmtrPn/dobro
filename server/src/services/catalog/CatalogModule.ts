import { Module } from '@nestjs/common';

import { MovieController } from './controllers/movie';
import { AffirmationController } from './controllers/affirmation';

@Module({
    controllers: [
        MovieController,
        AffirmationController,
    ],
})
export class CatalogModule {}
