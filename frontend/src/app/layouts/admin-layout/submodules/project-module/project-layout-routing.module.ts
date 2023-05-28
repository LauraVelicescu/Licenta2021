import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ApplicationRoutes} from '../../../../shared/util/ApplicationRoutes';
import {ProjectHubComponent} from './subcomponents/project-hub/project-hub.component';
import {ProjectBoardComponent} from './subcomponents/project-board/project-board.component';

const routes: Routes = [  {
  path: ApplicationRoutes.PROJECT_MANAGE_ROUTE, component: ProjectHubComponent,
}, {
  path: ApplicationRoutes.PROJECT_BOARD_ROUTE, component: ProjectBoardComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectLayoutRoutingModule { }
