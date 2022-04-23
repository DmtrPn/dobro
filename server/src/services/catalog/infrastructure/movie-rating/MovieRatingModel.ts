import { Entity, PrimaryColumn, ManyToOne, Column, JoinColumn } from 'typeorm';

import { BaseModel } from '@common/infrastructure/BaseModel';
import { MovieModel } from '@catalog/infrastructure/movie/MovieModel';

@Entity('movie_rating')
export class MovieRatingModel extends BaseModel<MovieRatingModel> {

    @PrimaryColumn()
    public movieId: string;

    @PrimaryColumn()
    public userId: string;

    @Column({ type: 'int' })
    public rating: number;

    @ManyToOne(() => MovieModel, model => model.ratings)
    @JoinColumn({ name: 'movie_id', referencedColumnName: 'id' })
    public movie?: MovieModel;

}
