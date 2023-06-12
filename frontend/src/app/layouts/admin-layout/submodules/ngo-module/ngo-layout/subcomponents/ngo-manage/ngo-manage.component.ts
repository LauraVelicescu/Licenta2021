import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {NgoDTO} from '../../../../../../../shared/dto/NgoDTO';
import {NGOService} from '../../../../../../../shared/services/ngo-service/ngo.service';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {NotificationService} from '../../../../../../../shared/services/notification-service/notification.service';
import {ApplicationService} from '../../../../../../../shared/services/application/application.service';
import {OperationType} from '../../../../../../../shared/util/OperationType';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {UserService} from '../../../../../../../shared/services/user-service/user.service';
import {UserDTO} from '../../../../../../../shared/dto/UserDTO';
import {formatDate} from '@angular/common';
import {MemberRequestDTO, MemberRequestStatus} from '../../../../../../../shared/dto/MemberRequestDTO';
import {OrganizationalComponentDTO} from '../../../../../../../shared/dto/OrganizationalComponentDTO';
import {MemberService} from '../../../../../../../shared/services/member-service/member.service';
import {Role} from '../../../../../../../shared/util/ApplicationRoutesInfo';
import {Report} from '../../../../project-module/subcomponents/project-hub/components/project-reports/project-reports.component';
import {ReportService} from '../../../../../../../shared/services/report/report.service';

@Component({
  selector: 'app-ngo-manage',
  templateUrl: './ngo-manage.component.html',
  styleUrls: ['./ngo-manage.component.scss']
})
export class NgoManageComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'acronym'];
  displayedColumnsForComponents: string[] = ['id', 'name', 'description', 'lead'];

  dataSource = new MatTableDataSource<NgoDTO>([]);


  persistState: boolean = false;
  persistStateForComponent: boolean = false;
  NGOForm: FormGroup;
  NGOComponentForm: FormGroup;
  currentNGO: NgoDTO;
  currentNGOComponent: OrganizationalComponentDTO;
  message: string;
  imageName: any;

  selection = new SelectionModel<NgoDTO>(true, []);
  length: number;

  selectionComponents = new SelectionModel<OrganizationalComponentDTO>(true, []);


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  // tslint:disable-next-line:no-shadowed-variable
  private componentEdit: boolean = false

  constructor(private formBuilder: FormBuilder, private NGOService: NGOService, private notificationService: NotificationService,
              private applicationService: ApplicationService, private matDialog: MatDialog,
              private reportService: ReportService) {
  }


  ngOnInit(): void {
    this.load();
    this.NGOForm = this.formBuilder.group({
        name: [''],
        acronym: [''],
        foundingDate: [''],
        facebookLink: [''],
        twitterLink: [''],
        linkedinLink: [''],
        description: ['']
      }
    )
    this.NGOComponentForm = this.formBuilder.group({
      name: [''],
      description: [''],
      lead: ['']
    })
  }

  public get operationType() {
    return OperationType;
  }

  private load() {
    this.persistState = false;
    this.selection.clear();
    this.applicationService.emmitLoading(true);
    if(this.applicationService.globalPrivileges.includes(Role.ADMIN)) {
      this.NGOService.findAllNGOsCount().subscribe((number) => {
        this.length = number;
        this.NGOService.findAllNGOs(this.paginator.pageIndex, this.paginator.pageSize).subscribe((result) => {
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
    } else {
      this.NGOService.findManagedNGOsCount().subscribe((number) => {
        this.length = number;
        this.NGOService.findManagedNGOs(this.paginator.pageIndex, this.paginator.pageSize).subscribe((result) => {
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
  }

  onSubmit() {
    if (this.NGOForm.invalid) {
      return;
    } else {
      const ngo: NgoDTO = this.currentNGO;
      if (ngo.id) {
        this.applicationService.emmitLoading(true);
        this.NGOService.update(ngo).subscribe((result) => {
            this.applicationService.emmitLoading(false);
            this.load();
          }, error => {
            this.applicationService.emmitLoading(false);
            this.notificationService.error(error);
          }
        )
      } else {
        this.NGOService.create(ngo).subscribe((result) => {
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

  public formatDate(date: Date) {
    if (date) {
      return formatDate(date, 'yyyy-MM-dd', 'en-US');
    }
  }

  handleOperation(operation: OperationType, payload?: NgoDTO[]) {

    switch (operation) {
      case OperationType.ADD:
        this.persistState = true;
        this.currentNGO = new NgoDTO();
        this.currentNGO.id = 0;
        this.currentNGO.componentList = [];
        break;
      case OperationType.MODIFY:
        this.persistState = true;
        this.currentNGO = payload[0];
        break;
      case OperationType.DELETE:
        this.applicationService.emmitLoading(true);
        this.NGOService.delete(payload).subscribe((result) => {
          this.applicationService.emmitLoading(false);
          this.load();
        })
        break;
      case OperationType.ASSIGN_FUNCTION_FOR_PEOPLE:
        this.currentNGO = payload[0];
        this.openDialog();
        break;
    }
  }


  handleOperationForComponents(operation: OperationType, payload?: OrganizationalComponentDTO[]) {

    switch (operation) {
      case OperationType.ADD:
        this.persistStateForComponent = true;
        this.currentNGOComponent = new OrganizationalComponentDTO();
        break;
      case OperationType.MODIFY:
        this.persistStateForComponent = true;
        this.currentNGOComponent = payload[0];
        this.componentEdit = true;
        break;
      case OperationType.DELETE:
        this.applicationService.emmitLoading(true);
        payload?.forEach(e => {
          this.currentNGO.componentList = this.currentNGO.componentList.filter(component => component !== e)
        });
        this.applicationService.emmitLoading(false);
        break;
    }
  }

  cancelAction() {
    this.load();
  }

  openDialog(): void {
    const dialogRef = this.matDialog.open(NgoMemberJoin, {
      width: '750px',
      data: {ngo: this.currentNGO}
    });
  }

  cancelPersistComponent() {
    this.persistStateForComponent = false;
  }

  onSubmitComponent() {
    if (this.NGOComponentForm.invalid) {
      return;
    } else {
      const ngoComponent: OrganizationalComponentDTO = this.currentNGOComponent;
      if (ngoComponent.id || this.componentEdit) {
        this.persistStateForComponent = false;
        this.componentEdit = false;
        this.selectionComponents.clear();
        this.applicationService.emmitLoading(false);
        this.currentNGO.componentList.forEach(e => {
          if (e === this.currentNGOComponent) {
            e = this.currentNGOComponent
          }
        })
      } else {
        this.persistStateForComponent = false;
        this.selectionComponents.clear();
        this.applicationService.emmitLoading(true);
        this.currentNGO.componentList.push(ngoComponent);
        this.applicationService.emmitLoading(false);
      }
    }
  }

  generateNgoReport(selected: NgoDTO[]) {
   this.downloadReport(Report.NGO_FINANCIAL_SITUATION, selected[0]);
  }

  downloadReport(report: Report, ngoDTO: NgoDTO) {
    this.reportService.downloadReport(report).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'report.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
  }

}


@Component({
  selector: 'app-ngo-member-join',
  templateUrl: 'ngo_member_join.html',
  styleUrls: ['./ngo-manage.component.scss']
})
export class NgoMemberJoin implements OnInit, AfterViewInit {

  @ViewChild('search') searchTextBox: ElementRef;

  selectFormControl = new FormControl();
  searchTextboxControl = new FormControl();
  selectedValues: UserDTO[] = [];
  comboData: UserDTO[] = []

  filteredOptions: Observable<any[]>;


  selection = new SelectionModel<MemberRequestDTO>(true, []);

  @ViewChild('paginator') paginator: MatPaginator;
  length: number;

  displayedColumns: string[] = ['id', 'Nume', 'Prenume', 'Motivatie'];
  dataSource = new MatTableDataSource<MemberRequestDTO>([]);


  constructor(
    public dialogRef: MatDialogRef<NgoMemberJoin>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private applicationService: ApplicationService,
    private notificationService: NotificationService,
    private ngoService: NGOService,
    private memberService: MemberService) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.applicationService.emmitLoading(true);
    this.userService.findUsers().subscribe((result) => {
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

    this.load();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.selection = new SelectionModel<MemberRequestDTO>(true, []);
  }

  public get operationType() {
    return OperationType;
  }

  private _filter(name: string): UserDTO[] {
    const filterValue = name.toLowerCase();
    this.setSelectedValues();
    this.selectFormControl.patchValue(this.selectedValues);
    return this.comboData.filter(option => ((option.firstName ?? '') + ' ' + (option.lastName ?? '')).toLowerCase().indexOf(filterValue) === 0);
  }

  selectionChange(event) {
    if (event.isUserInput && event.source.selected === false) {
      let index = this.selectedValues.indexOf(event.source.value);
      this.selectedValues.splice(index, 1)
    }
  }

  openedChange(e) {
    this.searchTextboxControl.patchValue('');
    if (e === true) {
      this.searchTextBox.nativeElement.focus();
    }
  }

  clearSearch(event) {
    event.stopPropagation();
    this.searchTextboxControl.patchValue('');
  }

  setSelectedValues() {
    if (this.selectFormControl.value && this.selectFormControl.value.length > 0) {
      this.selectFormControl.value.forEach((e) => {
        if (this.selectedValues.indexOf(e) === -1) {
          this.selectedValues.push(e);
        }
      });
    }
  }

  conclude() {
    this.applicationService.emmitLoading(true);
    this.memberService.addNgoMembers(this.data.ngo, this.selectedValues).subscribe((result2) => {
      this.applicationService.emmitLoading(false);
      result2.forEach(e => {
        this.notificationService.warning(e);
      })
      this.load();
    }, error => {
      this.applicationService.emmitLoading(false);
    })
  }

  getPrint(option: UserDTO) {
    return ((option?.firstName ?? '') + ' ' + (option?.lastName ?? ''));
  }

  private load() {
    this.dataSource.paginator = this.paginator;
    this.selection.clear();
    this.applicationService.emmitLoading(true);
    this.ngoService.getNgoRequestsNumber(this.data.ngo).subscribe((number) => {
      this.length = number;
      this.ngoService.getNgoRequests(this.paginator.pageIndex, this.paginator.pageSize, this.data.ngo).subscribe((result) => {
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

  handleOperation(operation: OperationType, payload?: MemberRequestDTO[]) {

    switch (operation) {
      case OperationType.ACCEPT_PENDING:
        this.ngoService.saveStatusMemberRequest(payload, MemberRequestStatus.ACCEPTED).subscribe((result) => {
          this.notificationService.warning('Users accepted to NGO');
        }, error => {
          this.notificationService.warning(error);
        })
        break;
      case OperationType.DECLINE_PENDING:
        this.ngoService.saveStatusMemberRequest(payload, MemberRequestStatus.DECLINED).subscribe((result) => {
          this.notificationService.warning('Users accepted to NGO');
        }, error => {
          this.notificationService.warning(error);
        })
        break;
    }
    this.load();
  }

}
