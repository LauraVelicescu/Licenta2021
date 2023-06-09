import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SelectionModel} from '@angular/cdk/collections';
import {PartnerDTO} from '../../../../../../../shared/dto/PartnerDTO';
import {MatTableDataSource} from '@angular/material/table';
import {ApplicationService} from '../../../../../../../shared/services/application/application.service';
import {NotificationService} from '../../../../../../../shared/services/notification-service/notification.service';
import {MatDialog} from '@angular/material/dialog';
import {NGOService} from '../../../../../../../shared/services/ngo-service/ngo.service';
import {FinancialService} from '../../../../../../../shared/services/financial/financial.service';
import {OperationType} from '../../../../../../../shared/util/OperationType';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent implements OnInit {

  persistState: boolean = false;

  selection = new SelectionModel<PartnerDTO>(false, []);

  partnerForm: FormGroup;
  displayedColumns: string[] = ['id', 'name', 'phone', 'mail', 'representative'];
  dataSource = new MatTableDataSource<PartnerDTO>([]);
  private currentPartner: PartnerDTO;
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
    this.load();
    this.partnerForm = this.formBuilder.group({
        name: ['', Validators.required],
        description: [''],
        phone: ['', Validators.required],
        mail: ['', Validators.required],
        representative: ['', Validators.required],
        address: ['', Validators.required]
      }
    )
  }

  public get operationType() {
    return OperationType;
  }

  handleOperation(operation: OperationType, payload?: PartnerDTO[]) {

    switch (operation) {
      case OperationType.ADD:
        this.persistState = true;
        this.currentPartner = new PartnerDTO();
        break;
      case OperationType.MODIFY:
        this.persistState = true;
        this.currentPartner = payload[0];
        break;
      case OperationType.DELETE:
        this.applicationService.emmitLoading(true);
        this.financialService.deletePartner(payload[0]).subscribe((result) => {
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
    this.financialService.getAllPartners().subscribe((result) => {
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
    if (this.partnerForm.invalid) {
      return;
    } else {
      const partner: PartnerDTO = this.currentPartner;
      if (partner.id) {
        this.applicationService.emmitLoading(true);
        this.financialService.updatePartner(partner).subscribe((result) => {
            this.applicationService.emmitLoading(false);
            this.load();
          }, error => {
            this.applicationService.emmitLoading(false);
            this.notificationService.error(error);
          }
        )
      } else {
        this.financialService.createPartner(partner).subscribe((result) => {
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
