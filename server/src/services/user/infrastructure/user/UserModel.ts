import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';

import { UserStatus } from 'dobro-types/enums';

import { BaseModel } from '@common/infrastructure/BaseModel';
import { MovieModel } from '@catalog/infrastructure/movie/MovieModel';

@Entity('users')
export class UserModel extends BaseModel<UserModel> {

    @PrimaryColumn({ name: 'user_id' })
    public id: string;

    @Column()
    public name: string;

    @Column()
    public email: string;

    @Column()
    public status: UserStatus;

    @Column()
    public password?: string;

    @OneToMany(() => MovieModel, movie => movie.author)
    public movies?: MovieModel[];

}
