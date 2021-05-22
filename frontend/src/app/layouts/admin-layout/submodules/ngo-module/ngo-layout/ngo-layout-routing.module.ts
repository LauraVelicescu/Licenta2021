import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NgoManageComponent} from './subcomponents/ngo-manage/ngo-manage.component';
import {ApplicationRoutes} from '../../../../../shared/util/ApplicationRoutes';

const routes: Routes = [
  {
    path: ApplicationRoutes.NGO_MANAGE_ROUTE, component: NgoManageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NgoLayoutRoutingModule { }
