import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ProjectDTO} from '../../../../../../../../shared/dto/ProjectDTO';
import {MatTableDataSource} from '@angular/material/table';
import {ProjectPartnerDTO} from '../../../../../../../../shared/dto/ProjectPartnerDTO';
import {SelectionModel} from '@angular/cdk/collections';
import {ProjectAction} from '../../project-hub.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApplicationService} from '../../../../../../../../shared/services/application/application.service';
import {NotificationService} from '../../../../../../../../shared/services/notification-service/notification.service';
import {ProjectService} from '../../../../../../../../shared/services/project-service/project.service';
import {FinancialService} from '../../../../../../../../shared/services/financial/financial.service';
import {Observable} from 'rxjs';
import {PartnerDTO} from '../../../../../../../../shared/dto/PartnerDTO';
import {NgoPartnersTypeDTO} from '../../../../../../../../shared/dto/NgoPartnersTypeDTO';
import {map, startWith} from 'rxjs/operators';
import {Role} from '../../../../../../../../shared/util/ApplicationRoutesInfo';

@Component({
  selector: 'app-project-parners',
  templateUrl: './project-parners.component.html',
  styleUrls: ['./project-parners.component.scss']
})
export class ProjectParnersComponent implements OnInit {


  @ViewChild('searchPartner') searchTextBoxPartner: ElementRef;
  selectFormControlPartner = new FormControl();
  searchTextboxControlPartner = new FormControl();
  comboDataPartner: PartnerDTO[] = [];
  selectedValuesPartner: PartnerDTO[] = [];
  filteredOptionsPartner: Observable<any[]>;

  @ViewChild('searchPartnerType') searchTextBoxPartnerType: ElementRef;
  selectFormControlPartnerType = new FormControl();
  searchTextboxControlPartnerType = new FormControl();
  private selectedPartnerType: NgoPartnersTypeDTO;
  comboDataPartnerType: NgoPartnersTypeDTO[] = [];
  selectedValuesPartnerType: NgoPartnersTypeDTO[] = [];
  filteredOptionsPartnerType: Observable<any[]>;


  displayedColumns: string[] = ['checkbox', 'partnerName', 'partnerType', 'amount'];
  dataSource = new MatTableDataSource<ProjectPartnerDTO>([]);
  private persistState: boolean = false;

  selection = new SelectionModel<ProjectPartnerDTO>(false, []);
  private currentAction: ProjectAction;
  selectedProjectPartner: ProjectPartnerDTO;
  partnerForm: FormGroup;
  private partnerEditCopy: ProjectPartnerDTO = undefined;
  @Input()
  private selectedProject: ProjectDTO;
  private selectedPartner: PartnerDTO ;
  @Output()
  emmitPartnerSave = new EventEmitter();

  constructor(private applicationService: ApplicationService,
              private notificationService: NotificationService,
              private projectService: ProjectService,
              private formBuilder: FormBuilder,
              private financialService: FinancialService) { }

  ngOnInit(): void {

    this.load();

    this.selection.changed.asObservable().subscribe(value => {
      this.selectedProjectPartner = {...value.added[0]};
      if (value.added.length === 0) {
        this.selectedProjectPartner = undefined;
      }
      this.currentAction = undefined;
    });


    this.partnerForm = this.formBuilder.group({
        amount: ['', Validators.required]
      }
    )
  }

  get projectAction() {
    return ProjectAction;
  }

  selectRow(row) {
    this.selection.toggle(row);
  }

  emitAction(action: ProjectAction, projectPartner?: ProjectPartnerDTO[] | undefined) {
    this.currentAction = action;
    if (this.currentAction === ProjectAction.PARTNER_ADD) {
      this.persistState = true;
      this.loadDropDowns();
      this.selectedProjectPartner = new ProjectPartnerDTO();
    } else if (this.currentAction === ProjectAction.PARTNER_EDIT) {
      this.persistState = true;
      this.selectedPartner = projectPartner[0].partner;
      this.selectedPartnerType = projectPartner[0].partnersType;
      this.loadDropDowns();
      this.selectedProjectPartner = {...projectPartner[0]};
    } else if (this.currentAction === ProjectAction.PARTNER_DELETE) {
      this.selectedProjectPartner = projectPartner[0];
      this.onSubmit(ProjectAction.PARTNER_DELETE)
    }
  }

  private loadDropDowns() {

    // load partners

    this.applicationService.emmitLoading(true);
    this.financialService.getAllPartners().subscribe((result) => {
      this.applicationService.emmitLoading(false);
      this.comboDataPartner = result;
      this.filteredOptionsPartner = this.searchTextboxControlPartner.valueChanges
        .pipe(
          startWith<string>(''),
          map(name => this._filterPartner(name))
        );
    }, error => {
      this.applicationService.emmitLoading(false);
    });

    // load partnersType
    this.applicationService.emmitLoading(true);
    this.financialService.getNgoPartnersTypeByNgoId(this.selectedProject.ngoYear.ngo).subscribe((result) => {
      this.applicationService.emmitLoading(false);
      this.comboDataPartnerType = result;
      this.filteredOptionsPartnerType = this.searchTextboxControlPartnerType.valueChanges
        .pipe(
          startWith<string>(''),
          map(name => this._filterPartnerType(name))
        );
    }, error => {
      this.applicationService.emmitLoading(false);
    });
  }

  onSubmit(currentAction: ProjectAction) {
    if (currentAction === ProjectAction.PARTNER_ADD || currentAction === ProjectAction.PARTNER_EDIT) {
      if (this.partnerForm.invalid || !this.selectedPartner || !this.selectedPartnerType) {
        return;
      } else {
        let partnerDTO: ProjectPartnerDTO = this.selectedProjectPartner;
        partnerDTO.partner = this.selectedPartner;
        partnerDTO.partnersType = this.selectedPartnerType;
        partnerDTO.project = this.selectedProject;
        if(partnerDTO.id) {
          this.applicationService.emmitLoading(true);
          this.financialService.updateProjectPartner(partnerDTO).subscribe((result) => {
              this.applicationService.emmitLoading(false);
              this.load();
            this.emmitPartnerSave.emit();
            }, error => {
              this.applicationService.emmitLoading(false);
              this.notificationService.error(error);
            }
          )
        } else {
          this.financialService.createProjectPartner(partnerDTO).subscribe((result) => {
              this.applicationService.emmitLoading(false);
              this.load();
              this.emmitPartnerSave.emit();
            }, error => {
              this.applicationService.emmitLoading(false);
              this.notificationService.error(error);
            }
          )
        }
      }
    } else if (currentAction === ProjectAction.PARTNER_DELETE) {
      this.applicationService.emmitLoading(true);
      this.financialService.deleteProjectPartner(this.selectedProjectPartner).subscribe((result) => {
        this.applicationService.emmitLoading(false);
        this.load();
        this.emmitPartnerSave.emit();
      })
    }
  }

  cancelAction(currentAction: ProjectAction) {
    this.persistState = false;
    this.currentAction = undefined;
    if (currentAction === ProjectAction.POSITIONS_ADD) {
      this.selectedProjectPartner = undefined;
    } else if (currentAction === ProjectAction.POSITIONS_EDIT) {
      this.selectedProjectPartner = this.partnerEditCopy;
    }
    this.partnerEditCopy = undefined;
  }

  private load() {
    this.persistState = false;
    this.selectedProjectPartner = undefined;
    this.applicationService.emmitLoading(true);
    this.financialService.getAllProjectPartnersByProjectId(this.selectedProject).subscribe((result) => {
      this.dataSource.data = result;
      this.applicationService.emmitLoading(false);
    }, error => {
      this.applicationService.emmitLoading(false);
      this.notificationService.error(error);
    })
  }

  openedChangePartner(e) {
    this.searchTextboxControlPartner.patchValue('');
    if (e === true) {
      this.searchTextBoxPartner.nativeElement.focus();
    }
  }


  clearSearchPartner(event) {
    event.stopPropagation();
    this.searchTextboxControlPartner.patchValue('');
    this.selectedPartner = undefined;
  }

  selectionChangePartner(event) {
    if (event.isUserInput) {
      this.selectedPartner = event.source.value;
    }
  }

  private _filterPartner(name: string): PartnerDTO[] {
    const filterValue = name.toLowerCase();
    this.selectFormControlPartner.patchValue(this.selectedValuesPartner);
    return this.comboDataPartner.filter(option => ((option.name ?? '')).toLowerCase().indexOf(filterValue) === 0);
  }

  getPrintPartner(option: PartnerDTO) {
    if (option) {
      return option.name;
    } else {
      return ''
    }
  }

  openedChangePartnerType(e) {
    this.searchTextboxControlPartnerType.patchValue('');
    if (e === true) {
      this.searchTextBoxPartnerType.nativeElement.focus();
    }
  }


  clearSearchPartnerType(event) {
    event.stopPropagation();
    this.searchTextboxControlPartner.patchValue('');
    this.selectedPartnerType = undefined;
  }

  selectionChangePartnerType(event) {
    if (event.isUserInput) {
      this.selectedPartnerType = event.source.value;
    }
  }

  private _filterPartnerType(name: string): NgoPartnersTypeDTO[] {
    const filterValue = name.toLowerCase();
    this.selectFormControlPartnerType.patchValue(this.selectedValuesPartnerType);
    return this.comboDataPartnerType.filter(option => (option.name).toLowerCase().indexOf(filterValue) === 0);
  }

  getPrintPartnerType(option: NgoPartnersTypeDTO) {
    if (option) {
      return option.name;
    } else {
      return ''
    }
  }

  canView() {
    return this.applicationService.globalPrivileges.includes(Role.ADMIN) || this.applicationService.globalPrivileges.includes(Role.NGO_ADMIN)
  }

}
