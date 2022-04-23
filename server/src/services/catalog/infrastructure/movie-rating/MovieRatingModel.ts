import { Entity, PrimaryColumn, Column } from 'typeorm';

import { BaseModel } from '@common/infrastructure/BaseModel';

@Entity('MovieRating')
export class MovieRatingModel extends BaseModel<MovieRatingModel> {

    @PrimaryColumn()
    public movieId: string;

    @PrimaryColumn()
    public userId: string;

    @Column({ type: 'int' })
    public rating: number;

}
