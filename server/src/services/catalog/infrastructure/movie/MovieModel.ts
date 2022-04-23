import { Entity, Column, OneToMany, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';

import { MovieStatus } from '@components/common/enums';
import { BaseModel } from '@common/infrastructure/BaseModel';
import { UserModel } from '@user/infrastructure/user/UserModel';
import { MovieRatingModel } from '@catalog/infrastructure/movie-rating/MovieRatingModel';

@Entity('movie')
export class MovieModel extends BaseModel<MovieModel> {

    @PrimaryColumn({ name: 'movie_id' })
    public id: string;

    @Column()
    public link: string;

    @Column()
    public name: string;

    @Column()
    public description?: string;

    @Column({ name: 'author_id' })
    public authorId: string;

    @Column()
    public status: MovieStatus;

    @ManyToOne(() => UserModel, model => model.movies)
    @JoinColumn({ name: 'author_id', referencedColumnName: 'id' })
    public author?: UserModel;

    @OneToMany(() => MovieRatingModel, model => model.movieId)
    @JoinColumn({ name: 'movie_id', referencedColumnName: 'id' })
    public ratings?: MovieRatingModel[];

}
