import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { Inject } from 'typescript-ioc';

import { AuthUserData } from 'dobro-types/backend';

import { Public } from '@components/decorators/Pubic';
import { IMovieCrudService } from '@catalog/domain/movie/IMovieCrudService';
import { User } from '@components/decorators';

import { MovieListResponse } from './responces';
import { MovieCreateForm, MovieUpdateForm } from './validators';
import { Uuid } from '@common/controllers/validators/Uuid';

@ApiTags('Фильмы')
@Controller('catalog/movie')
export class MovieController {

    @Inject private movieCrudService: IMovieCrudService;

    @Public()
    @ApiOkResponse({ type: MovieListResponse })
    @Get('/')
    public async find(): Promise<MovieListResponse> {
        const movies = await this.movieCrudService.find({});
        return { movies };
    }

    @Post('/')
    public async create(
        @Body() { movie }: MovieCreateForm,
        @User() user: AuthUserData,
    ): Promise<void> {
        await this.movieCrudService.create({ ...movie, authorId: user.id });
    }

    @Put('/:id')
    public async update(
        @Param() { id }: Uuid,
        @Body() { movie }: MovieUpdateForm,
    ): Promise<void> {
        await this.movieCrudService.update(id, movie);
    }

    @Delete('/:id')
    public async remove(
        @Param() { id }: Uuid,
    ): Promise<void> {
        await this.movieCrudService.remove(id);
    }

}
