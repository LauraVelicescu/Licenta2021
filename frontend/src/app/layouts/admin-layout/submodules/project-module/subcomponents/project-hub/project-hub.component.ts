import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {NgoDTO} from '../../../../../../shared/dto/NgoDTO';
import {map, startWith} from 'rxjs/operators';
import {ApplicationService} from '../../../../../../shared/services/application/application.service';
import {NGOService} from '../../../../../../shared/services/ngo-service/ngo.service';
import {MatTableDataSource} from '@angular/material/table';
import {ProjectDTO} from '../../../../../../shared/dto/ProjectDTO';
import {NotificationService} from '../../../../../../shared/services/notification-service/notification.service';
import {ProjectService} from '../../../../../../shared/services/project-service/project.service';
import {SelectionModel} from '@angular/cdk/collections';
import {formatDate} from '@angular/common';

enum ProjectAction {
  ADD = 'Add',
  EDIT = 'Edit',
  DELETE = 'Delete',
  TEAM = 'Team',
  BOARD = 'Board',
  REPORTS = 'Reports',

}

@Component({
  selector: 'app-project-hub',
  templateUrl: './project-hub.component.html',
  styleUrls: ['./project-hub.component.scss']
})
export class ProjectHubComponent implements OnInit {


  @ViewChild('search') searchTextBox: ElementRef;

  selectFormControl = new FormControl();
  searchTextboxControl = new FormControl();
  filteredOptions: Observable<any[]>;
  selectedNgo: NgoDTO;
  comboData: NgoDTO[] = [];
  selectedValues: NgoDTO[] = [];
  length: number = 0;
  projectForm: FormGroup;

  displayedColumns: string[] = ['checkbox', 'name', 'actions'];
  dataSource = new MatTableDataSource<ProjectDTO>([]);
  selectedProject: ProjectDTO;
  persistState: boolean = false;

  selection = new SelectionModel<ProjectDTO>(false, []);
  currentAction: ProjectAction;
  private projectEditCopy: ProjectDTO = undefined;


  constructor(private applicationService: ApplicationService,
              private ngoService: NGOService,
              private notificationService: NotificationService,
              private formBuilder: FormBuilder,
              private projectService: ProjectService) {
  }

  ngOnInit(): void {

    this.applicationService.emmitLoading(true);
    this.ngoService.findMyNGOs().subscribe((result) => {
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

    this.selection.changed.asObservable().subscribe(value => {
      this.selectedProject = {...value.added[0]};
      if (value.added.length === 0) {
        this.selectedProject = undefined;
      }
      this.currentAction = undefined;
    });


    this.projectForm = this.formBuilder.group({
        name: ['', Validators.required],
        description: [''],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required]
      }
    )
  }

  openedChange(e) {
    this.searchTextboxControl.patchValue('');
    if (e === true) {
      this.searchTextBox.nativeElement.focus();
    }
  }

  get projectAction() {
    return ProjectAction;
  }

  getPrint(option: NgoDTO) {
    return ((option?.name ?? '') + ' ' + (option?.acronym ?? ''));
  }

  clearSearch(event) {
    event.stopPropagation();
    this.searchTextboxControl.patchValue('');
    this.selectedNgo = undefined;
  }

  selectionChange(event) {
    if (event.isUserInput) {
      this.selectedNgo = event.source.value;
      this.load();
    }
  }

  private _filter(name: string): NgoDTO[] {
    const filterValue = name.toLowerCase();
    this.selectFormControl.patchValue(this.selectedValues);
    return this.comboData.filter(option => ((option.name ?? '') + ' ' + (option.acronym ?? '')).toLowerCase().indexOf(filterValue) === 0);
  }


  private load() {
    this.persistState = false;
    this.selectedProject = undefined;
    this.currentAction = undefined;
    this.selection.clear();
    this.applicationService.emmitLoading(true);
    this.projectService.findProjectsCount(this.selectedNgo).subscribe((number) => {
      this.length = number;
      this.projectService.findProjects(this.selectedNgo).subscribe((result) => {
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

  getCurrentOpenYear(selectedNgo: NgoDTO) {
    // resolve curent year programatically from ngodto
    return '2023-2024'
  }

  emitAction(action: ProjectAction) {
    this.currentAction = action;
    if (this.currentAction === ProjectAction.ADD) {
      this.selectedProject = new ProjectDTO();
    }
  }

  cancelAction(currentAction: ProjectAction) {

    if (currentAction === ProjectAction.ADD || currentAction === ProjectAction.EDIT || currentAction === ProjectAction.DELETE) {
      this.currentAction = undefined;
      if(currentAction === ProjectAction.ADD) {
        this.selectedProject = undefined;
      } else if (currentAction === ProjectAction.EDIT) {
        this.selectedProject =  this.projectEditCopy;
      }
      this.projectEditCopy = undefined;
    }
  }

  onSubmit(currentAction: ProjectAction) {

    if (currentAction === ProjectAction.ADD || currentAction === ProjectAction.EDIT) {
      if (this.projectForm.invalid) {
        return;
      } else {
        const project: ProjectDTO = this.selectedProject;
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
          this.projectService.create(project, this.selectedNgo).subscribe((result) => {
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

    if (currentAction === ProjectAction.DELETE) {
      this.applicationService.emmitLoading(true);
      this.projectService.delete(this.selectedProject).subscribe((result) => {
        this.applicationService.emmitLoading(false);
        this.load();
      })
    }
  }

  selectRow(row, action?: ProjectAction) {
    if (!(action && this.selection.isSelected(row))) {
      this.selection.toggle(row);
    }
    this.currentAction = action;
    if (this.currentAction === ProjectAction.EDIT) {
      this.projectEditCopy = {...this.selectedProject};
    }
  }

  public formatDateLocal(date: Date) {
    if (date) {
      let x = formatDate(date, 'yyyy-MM-dd', 'en-US');
      return x;
    }
  }
}
