import { Attributes, Class } from 'dobro-types/common';

import { IMovieCrudService } from '@catalog/domain/movie/IMovieCrudService';
import { MovieFindOptions } from '@catalog/domain/movie/types';

import { MovieModel } from './MovieModel';
import { MovieFindCommand } from './MovieFindCommand';
import { IdentityCrudService } from '@common/infrastructure/IdentityCrudService';
import { FindCommand } from '@common/infrastructure/FindCommand';

export class MovieCrudService
    extends IdentityCrudService<MovieModel, Attributes<MovieModel>, MovieFindOptions>
    implements IMovieCrudService {

    protected findCommand: Class<FindCommand<MovieModel, MovieFindOptions>, any> = MovieFindCommand;

    protected enrichCreationParams(params: Attributes<MovieModel>): MovieModel {
        return new MovieModel(params);
    }
}
