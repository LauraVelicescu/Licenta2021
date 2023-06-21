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
import {Router} from '@angular/router';
import {UserService} from '../../../../../../shared/services/user-service/user.service';
import {Role} from '../../../../../../shared/util/ApplicationRoutesInfo';
import {NgoYearDTO} from '../../../../../../shared/dto/NgoYearDTO';
import {FinancialService} from '../../../../../../shared/services/financial/financial.service';
import {SecurityStorage} from '../../../../../../security/SecurityStorage';

export enum ProjectAction {
  ADD = 'Add',
  EDIT = 'Edit',
  DELETE = 'Delete',
  TEAM = 'Team',
  BOARD = 'Board',
  REPORTS = 'Reports',
  POSITIONS = 'Team roles',
  PARTNERS = 'Partners',
  EXPENSES = 'Expenses',
  POSITIONS_ADD = 'Add position',
  POSITIONS_EDIT = 'Edit position',
  POSITIONS_DELETE = 'Delete position',
  MEMBER_ADD = 'Add member',
  MEMBER_EDIT = 'Edit member',
  MEMBER_DELETE = 'Delete member',
  PARTNER_ADD = 'Partner add',
  PARTNER_EDIT = 'Partner edit',
  PARTNER_DELETE = 'Partner delete',
  EXPENSE_ADD = 'Expense add',
  EXPENSE_EDIT = 'Expense edit',
  EXPENSE_DELETE = 'Expense delete',
  EXPENSE_APPROVE = 'Expense approve',
  EXPENSE_DENY = 'Expense deny',
  EXPENSE_UPLOAD = 'Expense upload',
  EXPENSE_DOWNLOAD = 'Expense download'
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

  @ViewChild('searchNgoYear') searchTextBoxNgoYear: ElementRef;

  selectFormControlNgoYear = new FormControl();
  searchTextboxControlNgoYear = new FormControl();
  filteredOptionsNgoYear: Observable<any[]>;
  selectedNgoYear: NgoYearDTO;
  comboDataNgoYear: NgoYearDTO[] = [];
  selectedValuesNgoYear: NgoYearDTO[] = [];

  length: number = 0;
  projectForm: FormGroup;

  displayedColumns: string[] = ['checkbox', 'name', 'actions'];
  dataSource = new MatTableDataSource<ProjectDTO>([]);
  selectedProject: ProjectDTO;
  persistState: boolean = false;

  selection = new SelectionModel<ProjectDTO>(false, []);
  currentAction: ProjectAction;
  private projectEditCopy: ProjectDTO = undefined;
  retrievedImage: any;
  selectedFile: File;
  base64Data: any;
  private canEditReports: boolean;
  private canViewProjectsFlag: boolean;


  constructor(private applicationService: ApplicationService,
              private ngoService: NGOService,
              private financialService: FinancialService,
              private notificationService: NotificationService,
              private formBuilder: FormBuilder,
              private projectService: ProjectService,
              private userService: UserService,
              private router: Router,
              private securityStorage: SecurityStorage) {
  }

  ngOnInit(): void {

    setTimeout(() => {
      if (this.applicationService.globalPrivileges.includes(Role.ADMIN)) {
        this.applicationService.emmitLoading(true);
        this.ngoService.findAllNGOs().subscribe((result) => {
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
      } else if (this.applicationService.globalPrivileges.includes(Role.NGO_ADMIN)) {
        this.applicationService.emmitLoading(true);
        this.ngoService.findManagedNGOs().subscribe((result) => {
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
      } else {
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
      }
    }, 300);


    this.selection.changed.asObservable().subscribe(value => {
      this.selectedProject = {...value.added[0]};
      if (value.added.length === 0) {
        this.selectedProject = undefined;
      }
      if (this.selectedProject?.id) {
        this.projectService.getProjectImage(this.selectedProject.id).subscribe((result) => {
          this.base64Data = result.logo;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        })
      }
      this.currentAction = undefined;
    });


    this.projectForm = this.formBuilder.group({
        name: ['', Validators.required],
        description: [''],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        facebook: [''],
        twitter: [''],
        linkedin: [''],
        budgetTreasury: [''],
        budgetPartners: [''],
        remainingBudget: ['']
      }
    )
  }

  openedChange(e) {
    this.searchTextboxControl.patchValue('');
    if (e === true) {
      this.searchTextBox.nativeElement.focus();
    }
  }

  openedChangeNgoYear(e) {
    this.searchTextboxControlNgoYear.patchValue('');
    if (e === true) {
      this.searchTextBoxNgoYear.nativeElement.focus();
    }
  }

  get projectAction() {
    return ProjectAction;
  }

  getPrint(option: NgoDTO) {
    return ((option?.name ?? '') + ' ' + (option?.acronym ? '[' + option?.acronym + ']' : ''));
  }

  getPrintNgoYear(option: NgoYearDTO) {
    return ((option?.name ?? ''));
  }

  clearSearch(event) {
    event.stopPropagation();
    this.searchTextboxControl.patchValue('');
    this.selectedNgo = undefined;
  }

  clearSearchNgoYear(event) {
    event.stopPropagation();
    this.searchTextboxControlNgoYear.patchValue('');
    this.selectedNgoYear = undefined;
  }

  selectionChange(event) {
    if (event.isUserInput) {
      this.selectedNgo = event.source.value;
      this.ngoService.findRoleReport(this.selectedNgo).subscribe((result) => {
        if(result) {
          this.canEditReports = true;
        } else {
          this.canEditReports = false;
        }
        this.ngoService.findRoleActiveMember(this.selectedNgo).subscribe((result2) => {
          if(result2) {
            this.canViewProjectsFlag = true;
          } else {
            this.canViewProjectsFlag = false;
          }
          this.loadNgoYears();
        })
      })
    }
  }

  selectionChangeNgoYear(event) {
    if (event.isUserInput) {
      this.selectedNgoYear = event.source.value;
      this.load();
    }
  }

  private _filter(name: string): NgoDTO[] {
    const filterValue = name.toLowerCase();
    this.selectFormControl.patchValue(this.selectedValues);
    return this.comboData.filter(option => ((option.name ?? '') + ' ' + (option.acronym ?? '')).toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterNgoYear(name: string): NgoYearDTO[] {
    const filterValue = name.toLowerCase();
    this.selectFormControlNgoYear.patchValue(this.selectedValuesNgoYear);
    return this.comboDataNgoYear.filter(option => ((option.name ?? '')).toLowerCase().indexOf(filterValue) === 0);
  }


  private load(keepSelection?:boolean) {
    this.persistState = false;
    if(!keepSelection) {
      this.selectedProject = undefined;
      this.currentAction = undefined;
      this.selection.clear();
    }

    this.applicationService.emmitLoading(true);
    this.projectService.findProjectsCount(this.selectedNgoYear).subscribe((number) => {
      this.length = number;
      this.projectService.findProjects(this.selectedNgoYear).subscribe((result) => {
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

  getCurrentOpenYear(selectedNgo: NgoYearDTO) {
    return selectedNgo.name
  }

  emitAction(action: ProjectAction) {
    this.currentAction = action;
    if (this.currentAction === ProjectAction.ADD) {
      this.selectedProject = new ProjectDTO();
    }
    if (this.currentAction === ProjectAction.BOARD) {
      this.router.navigate(['adm', 'project', 'board'], {state: {selectedProject: this.selectedProject}}).then();
    }
  }

  cancelAction(currentAction: ProjectAction) {

    if (currentAction === ProjectAction.ADD || currentAction === ProjectAction.EDIT || currentAction === ProjectAction.DELETE) {
      this.currentAction = undefined;
      if (currentAction === ProjectAction.ADD) {
        this.selectedProject = undefined;
      } else if (currentAction === ProjectAction.EDIT) {
        this.selectedProject = this.projectEditCopy;
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
          this.projectService.create(project, this.selectedNgoYear).subscribe((result) => {
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

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];

    const uploadImageData = new FormData();
    if (this.selectedFile.type.includes('image')) {
      uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
      this.projectService.updateLogo(uploadImageData, this.selectedProject).subscribe((result) => {
        this.base64Data = result.logo;
        this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
      });
    }
  }

  private loadNgoYears() {
    if(this.applicationService.globalPrivileges.includes(Role.NGO_ADMIN) || this.applicationService.globalPrivileges.includes(Role.ADMIN) || this.applicationService.globalPrivileges.includes(Role.REPORTS) || this.canViewProjectsFlag || this.canEditReports) {
      this.applicationService.emmitLoading(true);
      this.financialService.getNgoYearsByNgoId(this.selectedNgo).subscribe((result) => {
        this.applicationService.emmitLoading(false);
        this.comboDataNgoYear = result;
        this.filteredOptionsNgoYear = this.searchTextboxControlNgoYear.valueChanges
          .pipe(
            startWith<string>(''),
            map(name => this._filterNgoYear(name))
          );
      }, error => {
        this.applicationService.emmitLoading(false);
      });
    }
  }

  onEmmitPartnerSave() {
    this.load(true);
  }

  canView() {
    return this.applicationService.globalPrivileges.includes(Role.REPORTS) || this.applicationService.globalPrivileges.includes(Role.ADMIN) || this.applicationService.globalPrivileges.includes(Role.NGO_ADMIN)
  }

  canViewProject() {
    return this.applicationService.globalPrivileges.includes(Role.ADMIN) || this.applicationService.globalPrivileges.includes(Role.NGO_ADMIN)
  }
}
