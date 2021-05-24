import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NgoManageComponent} from './subcomponents/ngo-manage/ngo-manage.component';
import {ApplicationRoutes} from '../../../../../shared/util/ApplicationRoutes';
import {NgoManageFunctionsComponent} from './subcomponents/ngo-manage-functions/ngo-manage-functions.component';

const routes: Routes = [
  {
    path: ApplicationRoutes.NGO_MANAGE_ROUTE, component: NgoManageComponent
  },
  {
    path: ApplicationRoutes.NGO_MANAGE_FUNCTIONS_ROUTE, component: NgoManageFunctionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NgoLayoutRoutingModule { }
