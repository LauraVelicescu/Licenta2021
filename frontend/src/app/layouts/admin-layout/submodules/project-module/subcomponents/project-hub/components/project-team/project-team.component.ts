import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {ProjectMemberDTO} from '../../../../../../../../shared/dto/ProjectMemberDTO';
import {ProjectAction} from '../../project-hub.component';
import {formatDate} from '@angular/common';
import {ProjectService} from '../../../../../../../../shared/services/project-service/project.service';
import {ApplicationService} from '../../../../../../../../shared/services/application/application.service';
import {NotificationService} from '../../../../../../../../shared/services/notification-service/notification.service';
import {ProjectDTO} from '../../../../../../../../shared/dto/ProjectDTO';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MemberDTO} from '../../../../../../../../shared/dto/MemberDTO';
import {Observable} from 'rxjs';
import {ProjectPositionDTO} from '../../../../../../../../shared/dto/ProjectPositionDTO';
import {map, startWith} from 'rxjs/operators';
import {MemberService} from '../../../../../../../../shared/services/member-service/member.service';
import {NgoDTO} from '../../../../../../../../shared/dto/NgoDTO';
import {Role} from '../../../../../../../../shared/util/ApplicationRoutesInfo';

@Component({
  selector: 'app-project-team',
  templateUrl: './project-team.component.html',
  styleUrls: ['./project-team.component.scss']
})
export class ProjectTeamComponent implements OnInit {


  displayedColumns: string[] = ['no', 'name', 'position', 'organizationalUnit', 'since', 'actions'];
  dataSource = new MatTableDataSource<ProjectMemberDTO>([]);


  @Input()
  selectedProject: ProjectDTO;

  @Input()
  private selectedNGO: NgoDTO;

  currentAction: ProjectAction = undefined;
  private persistState: boolean;

  @ViewChild('searchMember') searchTextBoxMember: ElementRef;
  selectFormControlMember = new FormControl();
  searchTextboxControlMember = new FormControl();
  private selectedMember: MemberDTO;
  comboDataMember: MemberDTO[] = [];
  selectedValuesMember: MemberDTO[] = [];
  filteredOptionsMember: Observable<any[]>;

  @ViewChild('searchPosition') searchTextBoxPosition: ElementRef;
  selectFormControlPosition = new FormControl();
  searchTextboxControlPosition = new FormControl();
  private selectedPosition: ProjectPositionDTO;
  comboDataPosition: ProjectPositionDTO[] = [];
  selectedValuesPosition: ProjectPositionDTO[] = [];
  filteredOptionsPosition: Observable<any[]>;

  private selectedProjectMember: ProjectMemberDTO = undefined;
  memberForm: FormGroup;


  constructor(private projectService: ProjectService,
              private applicationService: ApplicationService,
              private notificationService: NotificationService,
              private formBuilder: FormBuilder,
              private memberService: MemberService
  ) {
  }

  ngOnInit(): void {
    this.load();

    this.memberForm = this.formBuilder.group({
        description: [''],
        since: ['', Validators.required],
      }
    )
  }

  getName(element: ProjectMemberDTO) {
    return element?.member?.user?.firstName + ' ' + element?.member?.user?.lastName;
  }

  getPosition(element: ProjectMemberDTO) {
    return element?.projectPosition ? element.projectPosition.name : '-NONE-';
  }

  getOrganizationalUnit(element: ProjectMemberDTO) {
    return element?.member?.organizationalComponent?.name;
  }

  getSince(element: ProjectMemberDTO) {
    if (element?.since) {
      let x = formatDate(element.since, 'yyyy-MM-dd', 'en-US');
      return x;
    }
  }

  public formatDateLocal(date: Date) {
    if (date) {
      let x = formatDate(date, 'yyyy-MM-dd', 'en-US');
      return x;
    }
  }

  load() {
    this.persistState = false;
    this.currentAction = undefined;
    this.selectedProjectMember = undefined;
    this.applicationService.emmitLoading(true);
    this.projectService.findProjectMembers(this.selectedProject).subscribe((result) => {
      this.applicationService.emmitLoading(false);
      this.dataSource.data = result;
    }, error => {
      this.applicationService.emmitLoading(false);
      this.notificationService.error(error);
    })
  }

  onSubmit(currentAction: ProjectAction) {

    if (currentAction === ProjectAction.MEMBER_ADD || currentAction === ProjectAction.MEMBER_EDIT) {
      if (this.memberForm.invalid || !this.selectedMember) {
        return
      } else {
        let projectMember: ProjectMemberDTO = this.selectedProjectMember;
        projectMember.projectPosition = this.selectedPosition;
        projectMember.member = this.selectedMember;
        if(projectMember.id) {
          this.applicationService.emmitLoading(true);
          this.projectService.updateMember(projectMember, this.selectedProject).subscribe((result) => {
              this.applicationService.emmitLoading(false);
              this.load();
            }, error => {
              this.applicationService.emmitLoading(false);
              this.notificationService.error(error);
            }
          )
        } else {
          this.projectService.createMember(projectMember, this.selectedProject).subscribe((result) => {
              this.applicationService.emmitLoading(false);
              this.load();
            }, error => {
              this.applicationService.emmitLoading(false);
              this.notificationService.error(error);
            }
          )
        }
      }
    } else if (currentAction === ProjectAction.MEMBER_DELETE) {
      this.applicationService.emmitLoading(true);
      this.projectService.deleteMember(this.selectedProjectMember).subscribe((result) => {
        this.applicationService.emmitLoading(false);
        this.load();
      })
    }
  }

  cancelAction(currentAction: ProjectAction) {
    this.persistState = false;
    this.currentAction = undefined;
    this.selectedPosition = undefined;
    this.selectedMember = undefined;
  }

  get actions() {
    return ProjectAction;
  }

  openedChangeMember(e) {
    this.searchTextboxControlMember.patchValue('');
    if (e === true) {
      this.searchTextBoxMember.nativeElement.focus();
    }
  }


  clearSearchMember(event) {
    event.stopPropagation();
    this.searchTextboxControlMember.patchValue('');
    this.selectedMember = undefined;
  }

  selectionChangeMember(event) {
    if (event.isUserInput) {
      this.selectedMember = event.source.value;
    }
  }

  private _filterMember(name: string): MemberDTO[] {
    const filterValue = name.toLowerCase();
    this.selectFormControlMember.patchValue(this.selectedValuesMember);
    return this.comboDataMember.filter(option => ((option.user.firstName ?? '') + ' ' + (option.user.lastName ?? '')).toLowerCase().indexOf(filterValue) === 0);
  }

  getPrintMember(option: MemberDTO) {
    if (option) {
      return option.user.firstName + ' ' + option.user.lastName;
    } else {
      return ''
    }
  }

  openedChangePosition(e) {
    this.searchTextboxControlPosition.patchValue('');
    if (e === true) {
      this.searchTextBoxPosition.nativeElement.focus();
    }
  }


  clearSearchPosition(event) {
    event.stopPropagation();
    this.searchTextboxControlMember.patchValue('');
    this.selectedPosition = undefined;
  }

  selectionChangePosition(event) {
    if (event.isUserInput) {
      this.selectedPosition = event.source.value;
    }
  }

  private _filterPosition(name: string): ProjectPositionDTO[] {
    const filterValue = name.toLowerCase();
    this.selectFormControlPosition.patchValue(this.selectedValuesPosition);
    return this.comboDataPosition.filter(option => (option.name).toLowerCase().indexOf(filterValue) === 0);
  }

  getPrintPosition(option: ProjectPositionDTO) {
    if (option) {
      return option.name;
    } else {
      return ''
    }
  }


  emitAction(action: ProjectAction, projectMember?: ProjectMemberDTO) {
    this.currentAction = action;
    if (this.currentAction === ProjectAction.MEMBER_ADD) {
      this.persistState = true;
      this.loadDropDowns();
      this.selectedProjectMember = new ProjectMemberDTO();
    } else if (this.currentAction === ProjectAction.MEMBER_EDIT) {
      this.persistState = true;
      this.selectedMember = projectMember.member;
      this.selectedPosition = projectMember.projectPosition;
      this.loadDropDowns();
      this.selectedProjectMember = {...projectMember};
    } else if (this.currentAction === ProjectAction.MEMBER_DELETE) {
      this.selectedProjectMember = projectMember;
      this.onSubmit(ProjectAction.MEMBER_DELETE)
    }
  }

  private loadDropDowns() {

    // load members

    this.applicationService.emmitLoading(true);
    this.memberService.getNGOMembers(this.selectedNGO).subscribe((result) => {
      this.applicationService.emmitLoading(false);
      this.comboDataMember = result;
      this.filteredOptionsMember = this.searchTextboxControlMember.valueChanges
        .pipe(
          startWith<string>(''),
          map(name => this._filterMember(name))
        );
    }, error => {
      this.applicationService.emmitLoading(false);
    });
    // load positions
    this.applicationService.emmitLoading(true);
    this.projectService.findProjectPositions(this.selectedProject).subscribe((result) => {
      this.applicationService.emmitLoading(false);
      this.comboDataPosition = result;
      this.filteredOptionsPosition = this.searchTextboxControlPosition.valueChanges
        .pipe(
          startWith<string>(''),
          map(name => this._filterPosition(name))
        );
    }, error => {
      this.applicationService.emmitLoading(false);
    });
  }

  canView() {
    return this.applicationService.globalPrivileges.includes(Role.ADMIN) || this.applicationService.globalPrivileges.includes(Role.NGO_ADMIN)
  }
}
