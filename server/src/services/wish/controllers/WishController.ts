import { Controller, Get, Req, Res } from '@nestjs/common';

import { Public } from '@components/decorators/Pubic';

import { WishService } from '../../wish/services';

@Controller('wish')
export class WishController {

    private wishService = new WishService();

    @Public()
    @Get('/')
    public async getWishes(
        @Req() request,
        @Res() response,
    ): Promise<any> {
        const wishes = await this.wishService.getWishes();
        // req.session.destroy();
        // req.logout();
        // res.redirect('/login');
        request.login({name: 'Dimea', id: '1412-ffsa-2rfas' }, (err, req) => {
            console.log('err', err);
            err
                ? response.status(401).send('<h1>Login Failure</h1>')
                : response.status(200).send(wishes);
        });

    }

}
