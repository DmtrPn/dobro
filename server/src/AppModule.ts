import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { middlewares } from '@components/middlewares';
import { LocalStrategy, SessionSerializer } from '@components/auth/local';

import { DreamModule } from '@services/dream/DreamModule';
import { WishModule } from '@services/wish/WishModule';
import { CatalogModule } from '@services/catalog/CatalogModule';

@Module({
    imports: [
        PassportModule.register({ session: true, defaultStrategy: 'local' }),
        DreamModule,
        WishModule,
        CatalogModule,
    ],
    providers: [LocalStrategy, SessionSerializer],
})
export class AppModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer.apply(...middlewares).forRoutes('*');
    }
}
