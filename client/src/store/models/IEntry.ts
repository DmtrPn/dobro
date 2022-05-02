export interface IEntry<D, UP> {
    update(params: UP): void;
    serialize(): D;
}
