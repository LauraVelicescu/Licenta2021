import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {NgoDTO} from '../../../../../../../shared/dto/NgoDTO';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {UserService} from '../../../../../../../shared/services/user-service/user.service';
import {ApplicationService} from '../../../../../../../shared/services/application/application.service';
import {NotificationService} from '../../../../../../../shared/services/notification-service/notification.service';
import {NGOService} from '../../../../../../../shared/services/ngo-service/ngo.service';
import {OperationType} from '../../../../../../../shared/util/OperationType';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {FunctionDTO} from '../../../../../../../shared/dto/FunctionDTO';

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

  displayedColumns: string[] = ['id', 'name', 'description'];
  dataSource = new MatTableDataSource<FunctionDTO>([]);
  selectedOption: NgoDTO;
  private currentFunction: FunctionDTO;

  constructor(
              private applicationService: ApplicationService,
              private notificationService: NotificationService,
              private ngoService: NGOService)
  {}

  ngOnInit(): void {

    this.applicationService.emmitLoading(true);
    this.ngoService.findMyNGOs().subscribe((result) => {
      console.log(result);
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
          this.load();
        })
        break;

    }
  }

  private load() {
    this.dataSource.paginator = this.paginator;
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

  }
}
