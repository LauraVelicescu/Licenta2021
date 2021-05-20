import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserManageComponent} from './subcomponents/user-manage/user-manage.component';
import {UserProfileComponent} from './subcomponents/user-profille/user-profile/user-profile.component';

const routes: Routes = [
  {
    path: 'me', component: UserProfileComponent,
  },
  {
    path: 'manage', component: UserManageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserLayoutRoutingModule {
}
