import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {NgoDTO} from '../../../../../../../../shared/dto/NgoDTO';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ApplicationService} from '../../../../../../../../shared/services/application/application.service';
import {NotificationService} from '../../../../../../../../shared/services/notification-service/notification.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {NGOService} from '../../../../../../../../shared/services/ngo-service/ngo.service';
import {map, startWith} from 'rxjs/operators';
import {OperationType} from '../../../../../../../../shared/util/OperationType';
import {MemberDTO} from '../../../../../../../../shared/dto/MemberDTO';
import {MemberService} from '../../../../../../../../shared/services/member-service/member.service';
import {AssignType, AssignUserComponent} from '../../ngo-manage-modals/assign-user/assign-user.component';

@Component({
  selector: 'app-ngo-manage-members',
  templateUrl: './ngo-manage-members.component.html',
  styleUrls: ['./ngo-manage-members.component.scss']
})
export class NgoManageMembersComponent implements OnInit {
  @ViewChild('search') searchTextBox: ElementRef;

  selectFormControl = new FormControl();
  searchTextBoxControl = new FormControl();
  filteredOptions: Observable<any[]>;
  selectedValues: NgoDTO[] = [];
  comboData: NgoDTO[] = [];
  persistState: boolean = false;

  selection= new SelectionModel<MemberDTO>(true, []);

  @ViewChild('paginator') paginator: MatPaginator;
  length: number;

  functionForm: FormGroup;
  displayedColumns: string[] = ['id', 'name', 'function', 'organizationalUnit'];
  dataSource = new MatTableDataSource<MemberDTO>([]);
  selectedNgo: NgoDTO;
  private selectedMembers: MemberDTO[];

  constructor(
    private applicationService: ApplicationService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private matDialog: MatDialog,
    private ngoService: NGOService,
    public dialogRef: MatDialogRef<AssignUserComponent>,
    private memberService: MemberService)
  {}

  ngOnInit(): void {



    this.applicationService.emmitLoading(true);
    this.ngoService.findManagedNGOs().subscribe((result) => {
      this.applicationService.emmitLoading(false);
      this.comboData = result;
      this.filteredOptions = this.searchTextBoxControl.valueChanges
        .pipe(
          startWith<string>(''),
          map(name => this._filter(name))
        );
    }, error => {
      this.applicationService.emmitLoading(false);
    });


    this.functionForm = this.formBuilder.group({
        name: [''],
        description: [''],
      }
    )
  }

  openedChange(e) {
    this.searchTextBoxControl.patchValue('');
    if (e === true) {
      this.searchTextBox.nativeElement.focus();
    }
  }

  getPrint(option: NgoDTO) {
    return ((option?.name ?? '') + ' ' + (option?.acronym ?? ''));
  }

  clearSearch(event) {
    event.stopPropagation();
    this.searchTextBoxControl.patchValue('');
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

  public get operationType() {
    return OperationType;
  }

  handleOperation(operation: OperationType, payload?: MemberDTO[]) {

    switch (operation) {
      case OperationType.DELETE:
        this.applicationService.emmitLoading(true);
        this.memberService.delete(payload).subscribe((result) => {
          this.applicationService.emmitLoading(false);
          this.load();
        })
        break;
      case OperationType.ASSIGN_ORGANIZATIONAL_UNIT:
        this.selectedMembers = payload;
        this.openDialog(AssignType.ORGANIZATIONAL_UNIT);
        this.dialogRef.afterClosed().subscribe(() => {
          this.load()
        })
        break;
      case OperationType.ASSIGN_FUNCTION:
        this.selectedMembers = payload;
        this.openDialog(AssignType.FUNCTION);
        this.dialogRef.afterClosed().subscribe(() => {
          this.load()
        })
        break;
    }
  }

  private load() {
    this.dataSource.paginator = this.paginator;
    this.persistState = false;
    this.selection.clear();
    this.applicationService.emmitLoading(true);
    this.memberService.getNGOMembersCount(this.selectedNgo).subscribe((number) => {
      this.length = number;
      this.memberService.getNGOMembers(this.selectedNgo).subscribe((result) => {
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

  getName(element: MemberDTO) {
    return element.user.firstName + ' ' + element.user.lastName;
  }

  getFunction(element: MemberDTO) {
    return element.function ? element.function.name : '-';
  }


  private openDialog(assignType: AssignType) {
    this.dialogRef = this.matDialog.open(AssignUserComponent, {
      width: '750px',
      data: {ngo: this.selectedNgo,
            assignType: assignType,
            members: this.selectedMembers
      }
    });
  }

  getOrganizationalComponent(element: MemberDTO) {
    return element.organizationalComponent ? element.organizationalComponent.name : '-';
  }
}
