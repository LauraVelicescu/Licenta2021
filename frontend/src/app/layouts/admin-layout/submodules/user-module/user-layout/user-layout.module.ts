import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserLayoutRoutingModule } from './user-layout-routing.module';
import { UserLayoutComponent } from './user-layout.component';
import {UserManageComponent, UserSendMassEmail} from './subcomponents/user-manage/user-manage.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UserProfileComponent } from './subcomponents/user-profille/user-profile/user-profile.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { UserRolesComponent } from './subcomponents/user-roles/user-roles.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";


@NgModule({
  declarations: [
    UserLayoutComponent,
    UserManageComponent,
    UserProfileComponent,
    UserRolesComponent,
    UserSendMassEmail
  ],
  imports: [
    CommonModule,
    UserLayoutRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class UserLayoutModule { }
