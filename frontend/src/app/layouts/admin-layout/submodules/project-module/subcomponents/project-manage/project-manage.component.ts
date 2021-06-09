import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {NgoDTO} from '../../../../../../shared/dto/NgoDTO';
import {SelectionModel} from '@angular/cdk/collections';
import {FunctionDTO} from '../../../../../../shared/dto/FunctionDTO';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ApplicationService} from '../../../../../../shared/services/application/application.service';
import {NotificationService} from '../../../../../../shared/services/notification-service/notification.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AssignUserComponent} from '../../../ngo-module/ngo-layout/subcomponents/ngo-manage-modals/assign-user/assign-user.component';
import {NGOService} from '../../../../../../shared/services/ngo-service/ngo.service';
import {map, startWith} from 'rxjs/operators';
import {OperationType} from '../../../../../../shared/util/OperationType';
import {ProjectDTO} from '../../../../../../shared/dto/ProjectDTO';
import {ProjectServiceService} from '../../../../../../shared/services/project-service/project-service.service';

@Component({
  selector: 'app-project-manage',
  templateUrl: './project-manage.component.html',
  styleUrls: ['./project-manage.component.scss']
})
export class ProjectManageComponent implements OnInit {
  @ViewChild('search') searchTextBox: ElementRef;

  selectFormControl = new FormControl();
  searchTextboxControl = new FormControl();
  filteredOptions: Observable<any[]>;
  selectedValues: NgoDTO[] = [];
  comboData: NgoDTO[] = [];
  persistState: boolean = false;

  selection= new SelectionModel<ProjectDTO>(false, []);

  @ViewChild('paginator') paginator: MatPaginator;
  length: number;

  projectForm: FormGroup;
  displayedColumns: string[] = ['id', 'name', 'description', 'startDate', 'endDate'];
  dataSource = new MatTableDataSource<ProjectDTO>([]);
  selectedOption: NgoDTO;
  currentNGO: NgoDTO;
  currentProject: ProjectDTO;

  constructor(
    private applicationService: ApplicationService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AssignUserComponent>,
    private matDialog: MatDialog,
    private ngoService: NGOService,
    private projectService: ProjectServiceService)
  {}

  ngOnInit(): void {



    this.applicationService.emmitLoading(true);
    this.ngoService.findMyNGOs().subscribe((result) => {
      // console.log(result);
      this.applicationService.emmitLoading(false);
      this.comboData = result;
      this.filteredOptions = this.searchTextboxControl.valueChanges
        .pipe(
          startWith<string>(''),
          map(name => this._filter(name))
        );
    }, error => {
      this.applicationService.emmitLoading(false);
    });


    this.projectForm = this.formBuilder.group({
        name: [''],
        description: [''],
        startDate: [''],
        endDate: ['']
      }
    )
  }

  openedChange(e) {
    this.searchTextboxControl.patchValue('');
    if (e === true) {
      this.searchTextBox.nativeElement.focus();
    }
  }

  getPrint(option: NgoDTO) {
    return ((option?.name ?? '') + ' ' + (option?.acronym ?? ''));
  }

  clearSearch(event) {
    event.stopPropagation();
    this.searchTextboxControl.patchValue('');
  }

  selectionChange(event) {
    if (event.isUserInput) {
      this.selectedOption = event.source.value;
      this.load();
    }
  }

  private _filter(name: string): NgoDTO[] {
    const filterValue = name.toLowerCase();
    this.selectFormControl.patchValue(this.selectedValues);
    return this.comboData.filter(option => ((option.name ?? '') + ' ' + (option.acronym ?? '')).toLowerCase().indexOf(filterValue) === 0);
  }

  public get operationType() {
    return OperationType;
  }

  handleOperation(operation: OperationType, payload?: ProjectDTO[]) {

    switch (operation) {
      case OperationType.ADD:
        this.persistState = true;
        this.currentProject = new ProjectDTO();
        break;
      case OperationType.MODIFY:
        this.persistState = true;
        this.currentProject = payload[0];
        break;
      case OperationType.DELETE:
        this.applicationService.emmitLoading(true);
        this.projectService.delete(payload).subscribe((result) => {
          this.applicationService.emmitLoading(false);
          this.load();
        })
        break;
      case OperationType.ASSIGN_PEOPLE:
        this.currentProject = payload[0];
        console.log(this.selectedOption );
        // this.openDialog();
        this.load()
        break;
    }
  }

  private load() {
    this.dataSource.paginator = this.paginator;
    this.persistState = false;
    this.selection.clear();
    this.applicationService.emmitLoading(true);
    this.projectService.findProjectsCount(this.selectedOption).subscribe((number) => {
      this.length = number;
      this.projectService.findProjects(this.selectedOption, this.paginator.pageIndex, this.paginator.pageSize).subscribe((result) => {
        this.applicationService.emmitLoading(false);
        this.dataSource.data = result;
      }, error => {
        this.applicationService.emmitLoading(false);
        this.notificationService.error(error);
      })
    }, error => {
      this.applicationService.emmitLoading(false);
      this.notificationService.error(error);
    })
  }

  // private openDialog() {
  //   console.log(this.selectedOption)
  //   this.dialogRef = this.matDialog.open(AssignUserComponent, {
  //     width: '750px',
  //     data: {ngo: this.selectedOption,
  //       ngoFunction: this.currentFunction
  //     }
  //   });
  // }

  cancelAction() {
    this.load();
  }

  onSubmit() {
    if (this.projectForm.invalid) {
      return;
    } else {
      const project: ProjectDTO = this.currentProject;
      project.name = this.projectForm.controls.name.value;
      project.description = this.projectForm.controls.description.value;
      project.startDate = this.projectForm.controls.startDate.value;
      project.endDate = this.projectForm.controls.endDate.value;
      if (project.id) {
        this.applicationService.emmitLoading(true);
        this.projectService.update(project).subscribe((result) => {
            this.applicationService.emmitLoading(false);
            this.load();
          }, error => {
            this.applicationService.emmitLoading(false);
            this.notificationService.error(error);
          }
        )
      } else {
        this.projectService.create(project, this.selectedOption).subscribe((result) => {
            this.applicationService.emmitLoading(false);
            this.load();
          }, error => {
            this.applicationService.emmitLoading(false);
            this.notificationService.error(error);
          }
        )
      }
    }
  }
}



