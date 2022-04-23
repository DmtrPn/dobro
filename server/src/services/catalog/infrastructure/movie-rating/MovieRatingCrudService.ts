// import { Class } from 'dobro-types/common';
//
// import { IMovieRatingCrudService } from '@catalog/domain/MovieRating/IMovieRatingCrudService';
// import { MovieRatingCreateData, MovieRatingFindOptions, MovieRatingUpdateData } from '@catalog/domain/MovieRating/types';
//
// import { MovieRatingRatingModel } from './MovieRatingRatingModel';
// import { MovieRatingRatingFindCommand } from './MovieRatingRatingFindCommand';
// import { IdentityCrudService } from '@common/infrastructure/IdentityCrudService';
// import { FindCommand } from '@common/infrastructure/FindCommand';
//
// export class MovieRatingRatingCrudService
//     extends IdentityCrudService<MovieRatingRatingModel, MovieRatingCreateData, MovieRatingUpdateData, MovieRatingFindOptions>
//     implements IMovieRatingCrudService {
//
//     protected modelClass = MovieRatingRatingModel;
//     protected findCommand: Class<FindCommand<MovieRatingRatingModel, MovieRatingFindOptions>, any> = MovieRatingRatingFindCommand;
//
//     protected enrichCreationParams(params: MovieRatingCreateData): MovieRatingRatingModel {
//         return new MovieRatingRatingModel({ ...params, status: MovieRatingStatus.New });
//     }
//
// }
