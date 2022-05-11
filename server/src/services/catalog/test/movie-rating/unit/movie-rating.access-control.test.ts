import '@core/test/unitTestRanner';
import { EntityName } from '@core/access-control/types';

import { EntityAccessControlTest } from '@core/access-control/test/utils/EntityAccessControlTest';

@Describe()
export class MovieRatingAccessControlTest extends EntityAccessControlTest {

    protected entityName = EntityName.MovieRating;

    @Test('Пользователь может создавать рейтинг фильма')
    public checkSimpleUserCanCreateEntity(): void {
        expect(this.canSimpleUserCanCreateEntity()).toBeTruthy();
    }

    @Test('Пользователь может редактировать рейтинг фильма')
    public checkSimpleUserCanEditEntity(): void {
        expect(this.canSimpleUserCanEditEntity()).toBeTruthy();
    }

    @Test('Пользователь может удалять рейтинг фильма')
    public checkSimpleUserCanRemoveEntity(): void {
        expect(this.canSimpleUserCanRemoveEntity()).toBeTruthy();
    }

    @Test('Пользователь может просматривать рейтинг фильма')
    public checkSimpleUserCanViewEntity(): void {
        expect(this.canSimpleUserCanViewEntity()).toBeTruthy();
    }

    @Test('Админ не может создавать рейтинг фильма')
    public checkAdminCanCreateEntity(): void {
        expect(this.canAdminCanCreateEntity()).toBeFalsy();
    }

    @Test('Админ не может редактировать рейтинг фильма')
    public checkAdminCanEditEntity(): void {
        expect(this.canAdminCanEditEntity()).toBeFalsy();
    }

    @Test('Админ не может удалять рейтинг фильма')
    public checkAdminCanRemoveEntity(): void {
        expect(this.canAdminCanRemoveEntity()).toBeFalsy();
    }

    @Test('Админ не может проматривать рейтинг фильма')
    public checkAdminCanViewEntity(): void {
        expect(this.canAdminCanViewEntity()).toBeFalsy();
    }

    @Test('Модератор не может создавать рейтинг фильма')
    public checkEntityModeratorCanCreateEntity(): void {
        expect(this.canEntityModeratorCanCreateEntity()).toBeFalsy();
    }

    @Test('Модератор не может редактировать рейтинг фильма')
    public checkEntityModeratorCanEditEntity(): void {
        expect(this.canEntityModeratorCanEditEntity()).toBeFalsy();
    }

    @Test('Модератор не может удалять рейтинг фильма')
    public checkEntityModeratorCanRemoveEntity(): void {
        expect(this.canEntityModeratorCanRemoveEntity()).toBeFalsy();
    }

    @Test('Модератор не может проматривать рейтинг фильма')
    public checkEntityModeratorCanViewEntity(): void {
        expect(this.canEntityModeratorCanViewEntity()).toBeFalsy();
    }

    @Test('Другой модератор не может создавать рейтинг фильма')
    public checkOtherEntityModeratorCanCreateEntity(): void {
        expect(this.canOtherEntityModeratorCanCreateEntity()).toBeFalsy();
    }

    @Test('Другой модератор не может редактировать рейтинг фильма')
    public checkOtherEntityModeratorCanEditEntity(): void {
        expect(this.canOtherEntityModeratorCanEditEntity()).toBeFalsy();
    }

    @Test('Другой модератор не может удалять рейтинг фильма')
    public checkOtherEntityModeratorCanRemoveEntity(): void {
        expect(this.canOtherEntityModeratorCanRemoveEntity()).toBeFalsy();
    }

    @Test('Другой модератор не может проматривать рейтинг фильма')
    public checkOtherEntityModeratorCanViewEntity(): void {
        expect(this.canOtherEntityModeratorCanViewEntity()).toBeFalsy();
    }

}
