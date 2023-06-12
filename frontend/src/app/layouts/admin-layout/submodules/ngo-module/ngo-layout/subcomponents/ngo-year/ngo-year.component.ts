import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {NgoDTO} from '../../../../../../../shared/dto/NgoDTO';
import {SelectionModel} from '@angular/cdk/collections';
import {NgoYearDTO} from '../../../../../../../shared/dto/NgoYearDTO';
import {MatTableDataSource} from '@angular/material/table';
import {ApplicationService} from '../../../../../../../shared/services/application/application.service';
import {NotificationService} from '../../../../../../../shared/services/notification-service/notification.service';
import {MatDialog} from '@angular/material/dialog';
import {NGOService} from '../../../../../../../shared/services/ngo-service/ngo.service';
import {Role} from '../../../../../../../shared/util/ApplicationRoutesInfo';
import {map, startWith} from 'rxjs/operators';
import {formatDate} from '@angular/common';
import {OperationType} from '../../../../../../../shared/util/OperationType';
import {FinancialService} from '../../../../../../../shared/services/financial/financial.service';
import {Report} from '../../../../project-module/subcomponents/project-hub/components/project-reports/project-reports.component';
import {ReportService} from '../../../../../../../shared/services/report/report.service';

@Component({
  selector: 'app-ngo-year',
  templateUrl: './ngo-year.component.html',
  styleUrls: ['./ngo-year.component.scss']
})
export class NgoYearComponent implements OnInit {


  @ViewChild('search') searchTextBox: ElementRef;

  selectFormControl = new FormControl();
  searchTextboxControl = new FormControl();
  filteredOptions: Observable<any[]>;
  selectedValues: NgoDTO[] = [];
  comboData: NgoDTO[] = [];
  persistState: boolean = false;

  selection = new SelectionModel<NgoYearDTO>(false, []);

  ngoYearForm: FormGroup;
  displayedColumns: string[] = ['id', 'name', 'startDate', 'endDate', 'treasury'];
  dataSource = new MatTableDataSource<NgoYearDTO>([]);
  selectedOption: NgoDTO;
  private currentNgoYear: NgoYearDTO;
  ngoName: string = '';

  constructor(
    private reportService: ReportService,
    private applicationService: ApplicationService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private matDialog: MatDialog,
    private ngoService: NGOService,
    private financialService: FinancialService) {
  }

  async ngOnInit() {

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

    this.ngoYearForm = this.formBuilder.group({
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        treasury: ['', Validators.required],
        remainingTreasury: ['']
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

  handleOperation(operation: OperationType, payload?: NgoYearDTO[]) {

    switch (operation) {
      case OperationType.ADD:
        this.persistState = true;
        this.currentNgoYear = new NgoYearDTO();
        break;
      case OperationType.MODIFY:
        this.persistState = true;
        this.currentNgoYear = payload[0];
        break;
      case OperationType.DELETE:
        this.applicationService.emmitLoading(true);
        this.financialService.deleteNgoYear(payload[0]).subscribe((result) => {
          this.applicationService.emmitLoading(false);
          this.load();
        })
        break;
    }
  }

  private load() {
    this.persistState = false;
    this.selection.clear();
    this.applicationService.emmitLoading(true);
    this.financialService.getNgoYearsByNgoId(this.selectedOption).subscribe((result) => {
      this.applicationService.emmitLoading(false);
      this.dataSource.data = result;
    }, error => {
      this.applicationService.emmitLoading(false);
      this.notificationService.error(error);
    })
  }

  cancelAction() {
    this.load();
  }

  onSubmit() {
    if (this.ngoYearForm.invalid) {
      return;
    } else {
      const ngoNgoYear: NgoYearDTO = this.currentNgoYear;
      ngoNgoYear.ngo = this.selectedOption;
      ngoNgoYear.name = this.currentNgoYear.startDate.toString().split('-')[0] + '-' + this.currentNgoYear.endDate.toString().split('-')[0]
      if (ngoNgoYear.id) {
        this.applicationService.emmitLoading(true);
        this.financialService.updateNgoYear(ngoNgoYear).subscribe((result) => {
            this.applicationService.emmitLoading(false);
            this.load();
          }, error => {
            this.applicationService.emmitLoading(false);
            this.notificationService.error(error);
          }
        )
      } else {
        this.financialService.createNgoYear(ngoNgoYear).subscribe((result) => {
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

  generateReport(selected: NgoYearDTO[]) {
    this.downloadReport(Report.NGO_YEAR_FINANCIAL_SITUATION, selected[0])
  }

  downloadReport(report: Report, ngoYearDTO: NgoYearDTO) {
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
