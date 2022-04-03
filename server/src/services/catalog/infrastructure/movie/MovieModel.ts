import { Entity, Column, PrimaryColumn } from 'typeorm';

import { MovieStatus } from 'dobro-types/enums';
import { BaseModel } from '@common/infrastructure/BaseModel';


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

    @Column({ type: 'int' })
    public rating: number;

}
