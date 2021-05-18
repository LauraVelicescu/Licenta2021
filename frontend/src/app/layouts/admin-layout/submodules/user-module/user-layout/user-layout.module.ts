import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserLayoutRoutingModule } from './user-layout-routing.module';
import { UserLayoutComponent } from './user-layout.component';
import { UserManageComponent } from './subcomponents/user-manage/user-manage.component';


@NgModule({
  declarations: [
    UserLayoutComponent,
    UserManageComponent
  ],
  imports: [
    CommonModule,
    UserLayoutRoutingModule
  ]
})
export class UserLayoutModule { }
