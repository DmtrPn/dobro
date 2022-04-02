import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';

import { middlewares } from '@components/middlewares';

import { DreamModule } from '@services/dream/DreamModule';
import { WishModule } from '@services/wish/WishModule';
import { CatalogModule } from '@services/catalog/CatalogModule';

@Module({
    imports: [DreamModule, WishModule, CatalogModule],
})
export class AppModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer.apply(...middlewares).forRoutes('*');
    }
}
