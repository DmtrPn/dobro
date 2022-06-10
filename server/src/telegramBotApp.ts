import { Telegraf, Markup } from 'telegraf';

import './bootstrap';
import { DbConnector } from '@core/db-connector';

const dbConnector = DbConnector.getInstance();

const bot = new Telegraf(process.env.TB_TOKEN);

bot.start((ctx) => {
    return ctx.reply('Что посмотреть?', Markup
        .keyboard([
            ['🎬 Что посмотреть?'],
        ])
        // .oneTime()
        .resize(),
    );
});

bot.on('sticker', (ctx) => ctx.reply('👍'));

bot.command('wmts', async (ctx) => {
    await dbConnector.initialize();
    const manager = dbConnector.getDataSource().manager;
    const rows = await manager.query('select * from movie offset floor(random() * (select count(*) from movie))  limit 1;');
    const movie = rows[0];

    ctx.reply(`${movie.name}

${movie.description}

${movie.link}`);
});

bot.hears('🎬 Что посмотреть?', async (ctx) => {
    await dbConnector.initialize();
    const manager = dbConnector.getDataSource().manager;
    const rows = await manager.query('select * from movie offset floor(random() * (select count(*) from movie))  limit 1;');
    const movie = rows[0];

    ctx.reply(`${movie.name}

${movie.description}

${movie.link}`);
});

bot.action(/.+/, (ctx) => {
    ctx.answerCbQuery(`Oh, ${ctx.match[0]}! Great choice`);
    ctx.reply('👍');
});

bot.on('text', (ctx) => {
    return ctx.reply('Что посмотреть?', Markup
        .keyboard([
            ['🎬 Что посмотреть?'],
        ])
        // .oneTime()
        .resize(),
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
// bot.launch();
bot.launch({
    webhook: {
        domain: `${process.env.TB_WEBHOOK_URL}/${process.env.TB_WEBHOOK_SECRET}`,
        port: Number(process.env.TB_WEBHOOK_PORT),
    },
});

// Enable graceful stop
process.once('SIGINT', async () => {
    await dbConnector.closeConnection();
    bot.stop('SIGINT');
});
process.once('SIGTERM', async () => {
    await dbConnector.closeConnection();
    bot.stop('SIGTERM');
});
