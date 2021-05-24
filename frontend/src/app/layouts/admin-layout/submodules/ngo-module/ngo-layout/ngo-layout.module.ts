import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgoLayoutRoutingModule } from './ngo-layout-routing.module';
import { NgoLayoutComponent } from './ngo-layout.component';
import {NgoManageComponent, NgoMemberJoin} from './subcomponents/ngo-manage/ngo-manage.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import { NgoManageFunctionsComponent } from './subcomponents/ngo-manage-functions/ngo-manage-functions.component';


@NgModule({
  declarations: [
    NgoLayoutComponent,
    NgoManageComponent,
    NgoMemberJoin,
    NgoManageFunctionsComponent
  ],
  imports: [
    CommonModule,
    NgoLayoutRoutingModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule
  ]
})
export class NgoLayoutModule { }
