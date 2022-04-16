import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { Inject } from 'typescript-ioc';

import { AuthUserData } from 'dobro-types/backend';

import { Uuid } from '@common/controllers/validators/Uuid';
import { Public } from '@components/decorators/Pubic';
import { IAffirmationCrudService } from '@catalog/domain/affirmation/IAffirmationCrudService';
import { User } from '@components/decorators';

import { AffirmationListResponse } from './responces/AffirmationListResponse';
import { AffirmationCreateForm } from './validators/AffirmationCreateForm';
import { AffirmationUpdateForm } from './validators/AffirmationUpdateForm';

@ApiTags('Affirmations')
@Controller('affirmation')
export class AffirmationController {

    @Inject private crudService: IAffirmationCrudService;

    @Public()
    @ApiOkResponse({ type: AffirmationListResponse })
    @Get('/')
    public async find(): Promise<AffirmationListResponse> {
        const movies = await this.crudService.find({});
        return { movies } as unknown as AffirmationListResponse;
    }

    @Post('/')
    public async create(
        @Body() { affirmation }: AffirmationCreateForm,
        @User() user: AuthUserData,
    ): Promise<void> {
        await this.crudService.create(affirmation);
    }

    @Put('/:id')
    public async update(
        @Param() { id }: Uuid,
        @Body() { affirmation }: AffirmationUpdateForm,
    ): Promise<void> {
        await this.crudService.update(id, affirmation);
    }

    @Delete('/:id')
    public async remove(
        @Param() { id }: Uuid,
    ): Promise<void> {
        await this.crudService.remove(id);
    }

}
