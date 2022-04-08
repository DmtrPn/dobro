import { Container } from 'typescript-ioc';

import { IMovieCrudService } from '@services/catalog/domain/movie/IMovieCrudService';
import { MovieCrudService } from '@services/catalog/infrastructure/movie/MovieCrudService';

Container.bind(IMovieCrudService).to(MovieCrudService);
