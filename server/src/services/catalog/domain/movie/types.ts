import { BaseFindOptions } from '@common/domain/types';

export interface MovieFindOptions extends BaseFindOptions {
    name?: string;
}
