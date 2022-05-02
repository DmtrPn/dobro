import { Container } from 'typescript-ioc';

import { IMovieCrudService } from '@catalog/domain/movie/IMovieCrudService';
import { MovieCrudService } from '@catalog/infrastructure/movie/MovieCrudService';

import { IAffirmationCrudService } from '@catalog/domain/affirmation/IAffirmationCrudService';
import { AffirmationCrudService } from '@catalog/infrastructure/affirmation/AffirmationCrudService';

import { IMovieRatingQueryService } from '@catalog/domain/movie-rating/IMovieRatingQueryService';
import { MovieRatingQueryService } from '@catalog/infrastructure/movie-rating/MovieRatingQueryService';
import { IMovieRatingRepository } from '@catalog/domain/movie-rating/IMovieRatingRepository';
import { MovieRatingRepository } from '@catalog/infrastructure/movie-rating/MovieRatingRepository';

import { IUserCrudService } from '@user/domain/user/IUserCrudService';
import { UserCrudService } from '@user/infrastructure/user/UserCrudService';

Container.bind(IMovieCrudService).to(MovieCrudService);
Container.bind(IUserCrudService).to(UserCrudService);
Container.bind(IAffirmationCrudService).to(AffirmationCrudService);
Container.bind(IMovieRatingQueryService).to(MovieRatingQueryService);
Container.bind(IMovieRatingRepository).to(MovieRatingRepository);
