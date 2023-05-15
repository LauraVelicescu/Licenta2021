import {Component, Input, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {ProjectPositionDTO} from '../../../../../../../../shared/dto/ProjectPositionDTO';
import {ProjectAction} from '../../project-hub.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApplicationService} from '../../../../../../../../shared/services/application/application.service';
import {NotificationService} from '../../../../../../../../shared/services/notification-service/notification.service';
import {ProjectService} from '../../../../../../../../shared/services/project-service/project.service';
import {ProjectDTO} from '../../../../../../../../shared/dto/ProjectDTO';

@Component({
  selector: 'app-project-positions',
  templateUrl: './project-positions.component.html',
  styleUrls: ['./project-positions.component.scss']
})
export class ProjectPositionsComponent implements OnInit {


  displayedColumns: string[] = ['checkbox', 'name'];
  dataSource = new MatTableDataSource<ProjectPositionDTO>([]);
  private persistState: boolean = false;

  selection = new SelectionModel<ProjectPositionDTO>(false, []);
  private currentAction: ProjectAction;
  selectedPosition: ProjectPositionDTO;
  positionForm: FormGroup;
  private positionEditCopy: ProjectPositionDTO = undefined;
  @Input()
  private selectedProject: ProjectDTO;

  constructor(private applicationService: ApplicationService,
              private notificationService: NotificationService,
              private projectService: ProjectService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.load();

    this.selection.changed.asObservable().subscribe(value => {
      this.selectedPosition = {...value.added[0]};
      if (value.added.length === 0) {
        this.selectedPosition = undefined;
      }
      this.currentAction = undefined;
    });


    this.positionForm = this.formBuilder.group({
        name: ['', Validators.required],
        description: ['']
      }
    )
  }

  get projectAction() {
    return ProjectAction;
  }

  selectRow(row) {
      this.selection.toggle(row);
  }

  emitAction(action: ProjectAction) {
    this.currentAction = action;
    if (this.currentAction === ProjectAction.POSITIONS_ADD) {
      this.persistState = true;
      this.selectedPosition = new ProjectPositionDTO();
    } else if (this.currentAction === ProjectAction.POSITIONS_EDIT){
      this.persistState = true;
      this.positionEditCopy = {...this.selectedPosition};
      console.log(this.selectedPosition)
    }
  }

  onSubmit(currentAction: ProjectAction) {
    this.persistState = false;
  }

  cancelAction(currentAction: ProjectAction) {
    this.persistState = false;
      this.currentAction = undefined;
      if (currentAction === ProjectAction.POSITIONS_ADD) {
        this.selectedPosition = undefined;
      } else if (currentAction === ProjectAction.POSITIONS_EDIT) {
        this.selectedPosition = this.positionEditCopy;
      }
      this.positionEditCopy = undefined;
  }

  private load() {
    this.applicationService.emmitLoading(true);
    this.projectService.findProjectPositions(this.selectedProject).subscribe((result) => {
      this.dataSource.data = result;
      this.applicationService.emmitLoading(false);
    }, error => {
      this.applicationService.emmitLoading(false);
      this.notificationService.error(error);
    })
  }
}
