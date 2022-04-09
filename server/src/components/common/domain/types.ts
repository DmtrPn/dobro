export interface BaseFindOptions<I = string> {
    ids?: I[];
}

export interface ICommand {
    execute(): Promise<void> | void;
}
