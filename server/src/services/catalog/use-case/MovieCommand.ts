import { Inject } from 'typescript-ioc';

import { UseCaseCommand } from '@common/use-cases/UseCaseCommand';
import { IMovieCrudService } from '@catalog/domain/movie/IMovieCrudService';

interface Params {
    email: string;
    password: string;
}

export abstract class MovieCommand extends UseCaseCommand<Params> {

    @Inject protected crudService: IMovieCrudService;


}
