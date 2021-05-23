import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserManageComponent} from './subcomponents/user-manage/user-manage.component';
import {UserProfileComponent} from './subcomponents/user-profille/user-profile/user-profile.component';
import {ApplicationRoutes} from '../../../../../shared/util/ApplicationRoutes';
import {UserRolesComponent} from './subcomponents/user-roles/user-roles.component';
import {UserApplyComponent} from "./subcomponents/user-apply/user-apply.component";

const routes: Routes = [
  {
    path: ApplicationRoutes.USER_ME_ROUTE, component: UserProfileComponent,
  },
  {
    path: ApplicationRoutes.USER_MANAGE_ROUTE, component: UserManageComponent
  },
  {
    path: ApplicationRoutes.USER_ROLES_ROUTE, component: UserRolesComponent
  },
  {
    path: ApplicationRoutes.USER_APPLY_ROUTE, component: UserApplyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserLayoutRoutingModule {
}
