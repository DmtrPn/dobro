import { isNil } from 'lodash';

import { DataFixCommand } from './DataFixCommand';
import { UserModel } from '@user/infrastructure/user/UserModel';
import { UserStatus } from 'dobro-types/enums';

const dima = {
    id: '246d7fba-0de2-4a9f-9c8f-b6e35e0681a1',
    email: 'rpsdapno@gmail.com',
    name: 'Дима',
    status: UserStatus.Active
};

export class CreateUsersCommand extends DataFixCommand {

    protected async run(): Promise<void> {
        const user = new UserModel(dima);

        await this.manager.save(UserModel, user);
    }

    protected async isAlreadyFixed(): Promise<boolean> {
        const user = await this.manager.findOneBy(UserModel, { id: dima.id});

        return !isNil(user);
    }

}
