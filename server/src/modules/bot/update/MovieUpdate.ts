import { Context, Markup } from 'telegraf';
import {
    Update,
    Ctx,
    Start,
    Help,
    On,
    Command,
    Hears,
    Action,
} from 'nestjs-telegraf';
// import { TelegrafContext } from './common/interfaces/telegraf-context.interface.ts';
import { botAuditLogService, BotAuditEventType } from '@components/auditLog/BotAuditLogService';
import { Inject } from 'typescript-ioc';
import { IMovieQueryService } from '@catalog/domain/movie/IMovieQueryService';

@Update()
export class MovieUpdate {

    @Inject private movieQueryService: IMovieQueryService;

    @Start()
    public async start(@Ctx() ctx: Context) {
        botAuditLogService.logEvent({
            userId: `${ctx.message.from.id}`,
            eventType: BotAuditEventType.Start,
            data: {
                username: this.getUsernameFromCtx(ctx),
                firstName: this.getFirstNameFromCtx(ctx),
            },
        });
        return ctx.reply('Жизнь неожиданна прекрасна', Markup
            .keyboard([['🎬 Что посмотреть?']])
            .resize(),
        );
    }

    @Help()
    public async help(@Ctx() ctx: Context) {
        await ctx.reply('Жизнь неожиданна прекрасна', Markup
            .keyboard([['🎬 Что посмотреть?']])
            .resize(),
        );
    }

    @Command('wmts')
    public async getMovieCCommand(@Ctx() ctx: Context) {
        botAuditLogService.logEvent({
            userId: `${ctx.message.from.id}`,
            eventType: BotAuditEventType.Command,
            data: {
                command: 'wmts',
                username: this.getUsernameFromCtx(ctx),
                firstName: this.getFirstNameFromCtx(ctx),
            },
        });

        await this.getRandomMovieResponse(ctx);
    }

    @On('sticker')
    public async on(@Ctx() ctx: Context) {
        await ctx.reply('👍');
    }

    @Hears('🎬 Что посмотреть?')
    public async hears(@Ctx() ctx: Context) {
        botAuditLogService.logEvent({
            userId: `${ctx.message.from.id}`,
            eventType: BotAuditEventType.GetMovie,
            data: {
                username: this.getUsernameFromCtx(ctx),
                firstName: this.getFirstNameFromCtx(ctx),
            },
        });

        return this.getRandomMovieResponse(ctx);
    }

    @Action('getMovie')
    public async getMovieAction(@Ctx() ctx: Context) {
        ctx.answerCbQuery('❤');
        botAuditLogService.logEvent({
            userId: `${ctx.callbackQuery.from.id}`,
            eventType: BotAuditEventType.ActionGetMovie,
            data: {
                username: ctx.callbackQuery.from.username,
                firstName: ctx.callbackQuery.from.first_name,
            },
        });

        return this.getRandomMovieResponse(ctx);
    }

    @On('text')
    public async onText(@Ctx() ctx: Context) {
        botAuditLogService.logEvent({
            userId: `${ctx.message.from.id}`,
            eventType: BotAuditEventType.Text,
            data: {
                text: (ctx.message as any).text,
                username: this.getUsernameFromCtx(ctx),
                firstName: this.getFirstNameFromCtx(ctx),
            },
        });
        await ctx.reply('Жизнь неожиданна прекрасна',
            Markup.inlineKeyboard([
                Markup.button.callback('🎬 Что посмотреть?', 'getMovie'),
            ]),
        );
    }

    private async getRandomMovieResponse(ctx: Context) {
        const movie = await this.movieQueryService.getRandom();

        await ctx.replyWithMarkdown(`*${movie.name}*

${movie.description}

${movie.link}`);
    }

    private getUsernameFromCtx(ctx: Context): string {
        return ctx.message.from?.username || '';
    }

    private getFirstNameFromCtx(ctx: Context): string {
        return ctx.message.from?.first_name || '';
    }
}