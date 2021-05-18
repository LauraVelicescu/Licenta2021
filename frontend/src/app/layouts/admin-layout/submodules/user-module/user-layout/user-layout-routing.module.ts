import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserManageComponent} from './subcomponents/user-manage/user-manage.component';

const routes: Routes = [
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
