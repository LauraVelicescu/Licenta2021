import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgoLayoutRoutingModule } from './ngo-layout-routing.module';
import { NgoLayoutComponent } from './ngo-layout.component';
import { NgoManageComponent } from './subcomponents/ngo-manage/ngo-manage.component';


@NgModule({
  declarations: [
    NgoLayoutComponent,
    NgoManageComponent
  ],
  imports: [
    CommonModule,
    NgoLayoutRoutingModule
  ]
})
export class NgoLayoutModule { }
