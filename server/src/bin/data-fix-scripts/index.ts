import { Class } from 'dobro-types/common';

import { ICommand } from '@common/domain';

import { CreateUsersCommand } from './CreateUsersCommand';

export const commands: Class<ICommand>[] = [
    CreateUsersCommand,
];
