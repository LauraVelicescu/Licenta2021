import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {NgoDTO} from '../../../../../../../shared/dto/NgoDTO';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {ApplicationService} from '../../../../../../../shared/services/application/application.service';
import {NotificationService} from '../../../../../../../shared/services/notification-service/notification.service';
import {NGOService} from '../../../../../../../shared/services/ngo-service/ngo.service';
import {OperationType} from '../../../../../../../shared/util/OperationType';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {FunctionDTO} from '../../../../../../../shared/dto/FunctionDTO';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AssignType, AssignUserComponent} from '../ngo-manage-modals/assign-user/assign-user.component';
import {Role} from '../../../../../../../shared/util/ApplicationRoutesInfo';
import {FinancialService} from '../../../../../../../shared/services/financial/financial.service';

@Component({
  selector: 'app-ngo-manage-functions',
  templateUrl: './ngo-manage-functions.component.html',
  styleUrls: ['./ngo-manage-functions.component.scss']
})
export class NgoManageFunctionsComponent implements OnInit {

  @ViewChild('search') searchTextBox: ElementRef;

  selectFormControl = new FormControl();
  searchTextboxControl = new FormControl();
  filteredOptions: Observable<any[]>;
  selectedValues: NgoDTO[] = [];
  comboData: NgoDTO[] = [];
  persistState: boolean = false;

  selection= new SelectionModel<FunctionDTO>(false, []);

  @ViewChild('paginator') paginator: MatPaginator;
  length: number;

  functionForm: FormGroup;
  displayedColumns: string[] = ['name', 'description'];
  dataSource = new MatTableDataSource<FunctionDTO>([]);
  selectedOption: NgoDTO;
  private currentFunction: FunctionDTO;

  constructor(
              private applicationService: ApplicationService,
              private notificationService: NotificationService,
              private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<AssignUserComponent>,
              private matDialog: MatDialog,
              private ngoService: NGOService)
  {}

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
      } else {
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
      }
    }, 100);

    this.functionForm = this.formBuilder.group({
        name: [''],
        description: [''],
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

  handleOperation(operation: OperationType, payload?: FunctionDTO[]) {

    switch (operation) {
      case OperationType.ADD:
        this.persistState = true;
          this.currentFunction = new FunctionDTO();
        break;
      case OperationType.MODIFY:
        this.persistState = true;
        this.currentFunction = payload[0];
        break;
      case OperationType.DELETE:
        this.applicationService.emmitLoading(true);
        this.ngoService.deleteFunction(payload).subscribe((result) => {
          this.applicationService.emmitLoading(false);
          result.forEach(e => {
            this.notificationService.warning(e);
          })
          this.load();
        })
        break;
      case OperationType.ASSIGN_FUNCTION_FOR_PEOPLE:
        this.currentFunction = payload[0];
        this.openDialog();
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
    this.ngoService.findNGOFunctionsCount(this.selectedOption).subscribe((number) => {
      this.length = number;
      this.ngoService.findNGOFunctions(this.selectedOption, this.paginator.pageIndex, this.paginator.pageSize).subscribe((result) => {
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

  private openDialog() {
   this.dialogRef = this.matDialog.open(AssignUserComponent, {
      width: '750px',
      data: {ngo: this.selectedOption,
             ngoFunction: this.currentFunction,
             assignType: AssignType.USER
      }
    });
  }

  cancelAction() {
    this.load();
  }

  onSubmit() {
    if (this.functionForm.invalid) {
      return;
    } else {
      const ngoFunction: FunctionDTO = this.currentFunction;
      ngoFunction.name = this.functionForm.controls.name.value;
      ngoFunction.description = this.functionForm.controls.description.value;
      if (ngoFunction.id) {
        this.applicationService.emmitLoading(true);
        this.ngoService.updateFunction(ngoFunction).subscribe((result) => {
            this.applicationService.emmitLoading(false);
            this.load();
          }, error => {
            this.applicationService.emmitLoading(false);
            this.notificationService.error(error);
          }
        )
      } else {
        this.ngoService.addFunction(ngoFunction, this.selectedOption).subscribe((result) => {
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
