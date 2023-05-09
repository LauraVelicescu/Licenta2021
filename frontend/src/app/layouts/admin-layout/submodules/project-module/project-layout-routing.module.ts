import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ApplicationRoutes} from '../../../../shared/util/ApplicationRoutes';
import {UserProfileComponent} from '../user-module/user-layout/subcomponents/user-profille/user-profile/user-profile.component';
import {ProjectManageComponent} from './subcomponents/project-manage/project-manage.component';
import {ProjectHubComponent} from './subcomponents/project-hub/project-hub.component';

const routes: Routes = [  {
  path: ApplicationRoutes.PROJECT_MANAGE_ROUTE, component: ProjectHubComponent,
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectLayoutRoutingModule { }
