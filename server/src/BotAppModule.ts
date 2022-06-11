import { TelegrafModule } from 'nestjs-telegraf';
import { Module } from '@nestjs/common';

import { BotModule } from '@bot/BotModule';

@Module({
    imports: [
        TelegrafModule.forRoot({
            token: process.env.TB_TOKEN,
            launchOptions: process.env.DOBRO_ENV !== 'dev'
                ? {
                    webhook: {
                        domain: `${process.env.TB_WEBHOOK_URL}/${process.env.TB_WEBHOOK_SECRET}`,
                        port: Number(process.env.TB_WEBHOOK_PORT),
                    },
                }
                : undefined,
        }),
        BotModule,
    ],
    providers: [],
})
export class BotAppModule {}
