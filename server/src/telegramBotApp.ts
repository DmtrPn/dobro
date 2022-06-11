import { Telegraf, Markup, Context } from 'telegraf';

import './bootstrap';
import { DbConnector } from '@core/db-connector';

import { botAuditLogService, BotAuditEventType } from '@components/auditLog/BotAuditLogService';

const dbConnector = DbConnector.getInstance();

const bot = new Telegraf(process.env.TB_TOKEN);

function getUsernameFromCtx(ctx: Context): string {
    return ctx.message.from?.username || '';
}

function getFirstNameFromCtx(ctx: Context): string {
    return ctx.message.from?.first_name || '';
}

bot.start((ctx) => {
    botAuditLogService.logEvent({
        userId: `${ctx.message.from.id}`,
        eventType: BotAuditEventType.Start,
        data: {
            username: getUsernameFromCtx(ctx),
            firstName: getFirstNameFromCtx(ctx),
        },
    });
    return ctx.reply('Жизнь неожиданна прекрасна', Markup
        .keyboard([
            ['🎬 Что посмотреть?'],
        ])
        // .oneTime()
        .resize(),
    );
});

bot.on('sticker', (ctx) => ctx.reply('👍'));

bot.command('wmts', async (ctx) => {
    botAuditLogService.logEvent({
        userId: `${ctx.message.from.id}`,
        eventType: BotAuditEventType.Command,
        data: {
            command: 'wmts',
            username: getUsernameFromCtx(ctx),
            firstName: getFirstNameFromCtx(ctx),
        },
    });
    await dbConnector.initialize();
    const manager = dbConnector.getDataSource().manager;
    const rows = await manager.query('select * from movie offset floor(random() * (select count(*) from movie))  limit 1;');
    const movie = rows[0];

    return ctx.replyWithMarkdown(`*${movie.name}*

${movie.description}

${movie.link}`);
});

bot.hears('🎬 Что посмотреть?', async (ctx) => {
    botAuditLogService.logEvent({
        userId: `${ctx.message.from.id}`,
        eventType: BotAuditEventType.GetMovie,
        data: {
            username: getUsernameFromCtx(ctx),
            firstName: getFirstNameFromCtx(ctx),
        },
    });
    await dbConnector.initialize();
    const manager = dbConnector.getDataSource().manager;
    const rows = await manager.query('select * from movie offset floor(random() * (select count(*) from movie))  limit 1;');
    const movie = rows[0];

    return ctx.replyWithMarkdown(`*${movie.name}*

${movie.description}

${movie.link}`);
});

bot.action('getMovie', async (ctx) => {
    ctx.answerCbQuery('❤');
    botAuditLogService.logEvent({
        userId: `${ctx.callbackQuery.from.id}`,
        eventType: BotAuditEventType.ActionGetMovie,
        data: {
            username: ctx.callbackQuery.from.username,
            firstName: ctx.callbackQuery.from.first_name,
        },
    });
    await dbConnector.initialize();
    const manager = dbConnector.getDataSource().manager;
    const rows = await manager.query('select * from movie offset floor(random() * (select count(*) from movie))  limit 1;');
    const movie = rows[0];

    return ctx.replyWithMarkdown(`*${movie.name}*

${movie.description}

${movie.link}`);
});

bot.on('text', (ctx) => {
    botAuditLogService.logEvent({
        userId: `${ctx.message.from.id}`,
        eventType: BotAuditEventType.Text,
        data: {
            text: ctx.message.text,
            username: getUsernameFromCtx(ctx),
            firstName: getFirstNameFromCtx(ctx),
        },
    });
    return ctx.reply('Жизнь неожиданна прекрасна',
        Markup.inlineKeyboard([
            Markup.button.callback('🎬 Что посмотреть?', 'getMovie'),
        ]),
    );
    // ctx.message {
    //   message_id: 15,
    //   from: {
    //     id: 308962021,
    //     is_bot: false,
    //     first_name: 'Dima Panov',
    //     username: 'dmtr_panov',
    //     language_code: 'ru'
    //   },
    //   chat: {
    //     id: 308962021,
    //     first_name: 'Dima Panov',
    //     username: 'dmtr_panov',
    //     type: 'private'
    //   },
    //   date: 1654801146,
    //   text: 'fff'
    // }

    // id: 308962021,
    //   first_name: 'Dima Panov',
    //   username: 'dmtr_panov',
    //   type: 'private'
});

if (process.env.DOBRO_ENV === 'dev') {
    bot.launch();
} else {
    bot.launch({
        webhook: {
            domain: `${process.env.TB_WEBHOOK_URL}/${process.env.TB_WEBHOOK_SECRET}`,
            port: Number(process.env.TB_WEBHOOK_PORT),
        },
    });
}

// Enable graceful stop
process.once('SIGINT', async () => {
    await dbConnector.closeConnection();
    bot.stop('SIGINT');
});
process.once('SIGTERM', async () => {
    await dbConnector.closeConnection();
    bot.stop('SIGTERM');
});
