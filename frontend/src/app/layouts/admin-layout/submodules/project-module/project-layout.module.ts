import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectLayoutRoutingModule } from './project-layout-routing.module';
import { ProjectLayoutComponent } from './project-layout.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import { ProjectHubComponent } from './subcomponents/project-hub/project-hub.component';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import { ProjectTeamComponent } from './subcomponents/project-hub/components/project-team/project-team.component';
import { ProjectPositionsComponent } from './subcomponents/project-hub/components/project-positions/project-positions.component';
import { ProjectBoardComponent } from './subcomponents/project-board/project-board.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatListModule} from '@angular/material/list';
import { ProjectReportsComponent } from './subcomponents/project-hub/components/project-reports/project-reports.component';
import { ProjectParnersComponent } from './subcomponents/project-hub/components/project-parners/project-parners.component';
import { ProjectExpensesComponent } from './subcomponents/project-hub/components/project-expenses/project-expenses.component';


@NgModule({
  declarations: [
    ProjectLayoutComponent,
    ProjectHubComponent,
    ProjectTeamComponent,
    ProjectPositionsComponent,
    ProjectBoardComponent,
    ProjectReportsComponent,
    ProjectParnersComponent,
    ProjectExpensesComponent
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
    MatInputModule,
    NgbDropdownModule,
    DragDropModule,
    MatListModule,
    FormsModule
  ]
})
export class ProjectLayoutModule { }
