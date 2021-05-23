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
import {MemberRequestDTO, MemberRequestStatus} from '../../../../../../../shared/dto/MemberRequestDTO';

@Component({
  selector: 'app-ngo-manage',
  templateUrl: './ngo-manage.component.html',
  styleUrls: ['./ngo-manage.component.scss']
})
export class NgoManageComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'acronym'];
  dataSource = new MatTableDataSource<NgoDTO>([]);

  persistState: boolean = false;
  NGOForm: FormGroup;
  selectedFile: File;
  currentNGO: NgoDTO
  retrievedImage: any;
  base64Data: any;
  message: string;
  imageName: any;

  selection = new SelectionModel<NgoDTO>(true, []);

  @ViewChild('paginator') paginator: MatPaginator;
  length: number;

  // tslint:disable-next-line:no-shadowed-variable
  constructor(private formBuilder: FormBuilder, private NGOService: NGOService, private notificationService: NotificationService,
              private applicationService: ApplicationService, private matDialog: MatDialog) {
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
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.selection = new SelectionModel<NgoDTO>(true, []);
  }

  public get operationType() {
    return OperationType;
  }

  private load() {
    this.dataSource.paginator = this.paginator;
    this.persistState = false;
    this.selection.clear();
    this.applicationService.emmitLoading(true);
    this.NGOService.findNGOsCount().subscribe((number) => {
      this.length = number;
      this.NGOService.findNGOs(this.paginator.pageIndex, this.paginator.pageSize).subscribe((result) => {
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

  onSubmit() {
    if (this.NGOForm.invalid) {
      return;
    } else {
      const ngo: NgoDTO = this.currentNGO;
      ngo.name = this.NGOForm.controls.name.value;
      ngo.foundingDate = this.NGOForm.controls.foundingDate.value;
      ngo.acronym = this.NGOForm.controls.acronym.value;
      ngo.facebookLink = this.NGOForm.controls.facebookLink.value;
      ngo.twitterLink = this.NGOForm.controls.twitterLink.value;
      ngo.linkedinLink = this.NGOForm.controls.linkedinLink.value;
      ngo.description = this.NGOForm.controls.description.value;
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

  handleOperation(operation: OperationType, payload?: NgoDTO[]) {

    switch (operation) {
      case OperationType.ADD:
        this.persistState = true;
        this.currentNGO = new NgoDTO();
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
      case OperationType.ASSIGN_PEOPLE:
        this.currentNGO = payload[0];
        this.openDialog();
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
    private ngoService: NGOService) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    console.log(this.data);
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
    this.ngoService.addNgoMembers(this.data.ngo, this.selectedValues).subscribe((result2) => {
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