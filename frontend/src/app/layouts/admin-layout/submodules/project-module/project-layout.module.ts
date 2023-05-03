import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectLayoutRoutingModule } from './project-layout-routing.module';
import { ProjectLayoutComponent } from './project-layout.component';
import {ProjectManageComponent} from './subcomponents/project-manage/project-manage.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [
    ProjectLayoutComponent,
    ProjectManageComponent
  ],
  imports: [
    CommonModule,
    ProjectLayoutRoutingModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule
  ]
})
export class ProjectLayoutModule { }