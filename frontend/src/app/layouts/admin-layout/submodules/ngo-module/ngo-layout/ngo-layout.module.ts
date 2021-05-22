import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgoLayoutRoutingModule } from './ngo-layout-routing.module';
import { NgoLayoutComponent } from './ngo-layout.component';
import { NgoManageComponent } from './subcomponents/ngo-manage/ngo-manage.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    NgoLayoutComponent,
    NgoManageComponent
  ],
  imports: [
    CommonModule,
    NgoLayoutRoutingModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatButtonModule
  ]
})
export class NgoLayoutModule { }
