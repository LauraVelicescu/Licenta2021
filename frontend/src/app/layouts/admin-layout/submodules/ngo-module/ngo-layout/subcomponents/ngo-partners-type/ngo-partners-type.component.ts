import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {NgoDTO} from '../../../../../../../shared/dto/NgoDTO';
import {SelectionModel} from '@angular/cdk/collections';
import {NgoPartnersTypeDTO} from '../../../../../../../shared/dto/NgoPartnersTypeDTO';
import {MatTableDataSource} from '@angular/material/table';
import {ApplicationService} from '../../../../../../../shared/services/application/application.service';
import {NotificationService} from '../../../../../../../shared/services/notification-service/notification.service';
import {MatDialog} from '@angular/material/dialog';
import {NGOService} from '../../../../../../../shared/services/ngo-service/ngo.service';
import {FinancialService} from '../../../../../../../shared/services/financial/financial.service';
import {Role} from '../../../../../../../shared/util/ApplicationRoutesInfo';
import {map, startWith} from 'rxjs/operators';
import {OperationType} from '../../../../../../../shared/util/OperationType';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-ngo-partners-type',
  templateUrl: './ngo-partners-type.component.html',
  styleUrls: ['./ngo-partners-type.component.scss']
})
export class NgoPartnersTypeComponent implements OnInit {


  @ViewChild('search') searchTextBox: ElementRef;

  selectFormControl = new FormControl();
  searchTextboxControl = new FormControl();
  filteredOptions: Observable<any[]>;
  selectedValues: NgoDTO[] = [];
  comboData: NgoDTO[] = [];
  persistState: boolean = false;

  selection = new SelectionModel<NgoPartnersTypeDTO>(false, []);

  ngoPartnersTypeForm: FormGroup;
  displayedColumns: string[] = ['id', 'name', 'minAmount', 'maxAmount'];
  dataSource = new MatTableDataSource<NgoPartnersTypeDTO>([]);
  selectedOption: NgoDTO;
  private currentNgoPartnersType: NgoPartnersTypeDTO;
  ngoName: string = '';

  constructor(
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

    this.ngoPartnersTypeForm = this.formBuilder.group({
        name: ['', Validators.required],
        description: [''],
        minAmount: ['', Validators.required],
        maxAmount: ['', Validators.required],
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

  handleOperation(operation: OperationType, payload?: NgoPartnersTypeDTO[]) {

    switch (operation) {
      case OperationType.ADD:
        this.persistState = true;
        this.currentNgoPartnersType = new NgoPartnersTypeDTO();
        break;
      case OperationType.MODIFY:
        this.persistState = true;
        this.currentNgoPartnersType = payload[0];
        break;
      case OperationType.DELETE:
        this.applicationService.emmitLoading(true);
        this.financialService.deleteNgoPartnerType(payload[0]).subscribe((result) => {
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
    this.financialService.getNgoPartnersTypeByNgoId(this.selectedOption).subscribe((result) => {
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
    if (this.ngoPartnersTypeForm.invalid) {
      return;
    } else {
      const ngoNgoPartnersType: NgoPartnersTypeDTO = this.currentNgoPartnersType;
      ngoNgoPartnersType.ngo = this.selectedOption;
      if (ngoNgoPartnersType.id) {
        this.applicationService.emmitLoading(true);
        this.financialService.updateNgoPartnerType(ngoNgoPartnersType).subscribe((result) => {
            this.applicationService.emmitLoading(false);
            this.load();
          }, error => {
            this.applicationService.emmitLoading(false);
            this.notificationService.error(error);
          }
        )
      } else {
        this.financialService.createNgoPartnerType(ngoNgoPartnersType).subscribe((result) => {
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
}
