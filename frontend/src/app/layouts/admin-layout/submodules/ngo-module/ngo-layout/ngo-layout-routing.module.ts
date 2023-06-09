import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NgoManageComponent} from './subcomponents/ngo-manage/ngo-manage.component';
import {ApplicationRoutes} from '../../../../../shared/util/ApplicationRoutes';
import {NgoManageFunctionsComponent} from './subcomponents/ngo-manage-functions/ngo-manage-functions.component';
import {NgoManageMembersComponent} from './subcomponents/ngo-manage-members/ngo-manage-members/ngo-manage-members.component';
import {NgoYearComponent} from './subcomponents/ngo-year/ngo-year.component';
import {NgoPartnersTypeComponent} from './subcomponents/ngo-partners-type/ngo-partners-type.component';

const routes: Routes = [
  {
    path: ApplicationRoutes.NGO_MANAGE_ROUTE, component: NgoManageComponent
  },
  {
    path: ApplicationRoutes.NGO_MANAGE_FUNCTIONS_ROUTE, component: NgoManageFunctionsComponent
  },
  {
    path: ApplicationRoutes.NGO_MANAGE_MEMBERS_ROUTE, component: NgoManageMembersComponent
  },
  {
    path: ApplicationRoutes.NGO_YEAR_ROUTE, component: NgoYearComponent
  },
  {
    path: ApplicationRoutes.NGO_PARTNER_TYPE_ROUTE, component: NgoPartnersTypeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NgoLayoutRoutingModule { }
