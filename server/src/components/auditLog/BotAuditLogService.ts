import { IAuditLogService } from './IAuditLogService';

export const enum BotAuditEventType {
    Start = 'Start',
    Command = 'Command',
    Text = 'text',
    GetMovie = 'GetMovie',
}

class BotAuditLogService extends IAuditLogService<BotAuditEventType> {
    protected readonly apiKey = process.env.AMPLITUDE_BOT_PKEY;
}

export const botAuditLogService = new BotAuditLogService();
