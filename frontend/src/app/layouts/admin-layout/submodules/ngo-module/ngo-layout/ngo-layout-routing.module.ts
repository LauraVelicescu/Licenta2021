import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NgoManageComponent} from './subcomponents/ngo-manage/ngo-manage.component';

const routes: Routes = [
  {
    path: 'manage', component: NgoManageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NgoLayoutRoutingModule { }
