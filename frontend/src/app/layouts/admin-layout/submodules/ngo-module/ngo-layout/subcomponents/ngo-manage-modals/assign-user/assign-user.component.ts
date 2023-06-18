import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {UserDTO} from "../../../../../../../../shared/dto/UserDTO";
import {NgoDTO} from "../../../../../../../../shared/dto/NgoDTO";
import {map, startWith} from "rxjs/operators";
import {ApplicationService} from "../../../../../../../../shared/services/application/application.service";
import {NotificationService} from "../../../../../../../../shared/services/notification-service/notification.service";
import {NGOService} from "../../../../../../../../shared/services/ngo-service/ngo.service";
import {MemberDTO} from "../../../../../../../../shared/dto/MemberDTO";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MemberService} from '../../../../../../../../shared/services/member-service/member.service';
import {FunctionDTO} from '../../../../../../../../shared/dto/FunctionDTO';
import {OrganizationalComponentDTO} from '../../../../../../../../shared/dto/OrganizationalComponentDTO';

export enum AssignType {
  USER,
  FUNCTION,
  ORGANIZATIONAL_UNIT
}
const NONE = 'None';

@Component({
  selector: 'app-assign-user',
  templateUrl: './assign-user.component.html',
  styleUrls: ['./assign-user.component.scss']
})
export class AssignUserComponent implements OnInit {

  @ViewChild('search') searchTextBox: ElementRef;



  assignType: AssignType;

  selectFormControl = new FormControl();
  searchTextBoxControl = new FormControl();
  filteredOptions: Observable<any[]>;
  selectedOption: MemberDTO;
  selectedValues: MemberDTO[] = [];
  comboData: MemberDTO[] = [];


  selectedOptionFunction: FunctionDTO;
  selectedValuesFunction: FunctionDTO[] = [];
  comboDataFunction: FunctionDTO[] = [];


  selectedOptionOrganizationalComponent: OrganizationalComponentDTO;
  selectedValuesOrganizationalComponent: OrganizationalComponentDTO[] = [];
  comboDataOrganizationalComponent: OrganizationalComponentDTO[] = [];

  selectedNGO: NgoDTO;
  constructor(public dialogRef: MatDialogRef<AssignUserComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private applicationService: ApplicationService,
              private notificationService: NotificationService,
              private ngoService: NGOService,
              private memberService: MemberService) { }

  ngOnInit(): void {

    this.selectedNGO = this.data.ngo;
    this.assignType = this.data.assignType;
    this.applicationService.emmitLoading(true);
    switch (this.assignType) {
      case AssignType.FUNCTION:
        this.comboDataFunction = []
        console.log(this.comboDataFunction)
        this.ngoService.findNGOFunctions(this.selectedNGO).subscribe((result) => {
          this.comboDataFunction = result;
          this.comboDataFunction.push({description: '', id: 0, name: NONE})
          console.log(this.comboDataFunction)
          this.filteredOptions = this.searchTextBoxControl.valueChanges
            .pipe(
              startWith<string>(''),
              map(name => this._filter(name))
            );
          this.applicationService.emmitLoading(false);
        }, error => {
          this.applicationService.emmitLoading(false);
        });
        break;
      case AssignType.ORGANIZATIONAL_UNIT:
        this.comboDataOrganizationalComponent = [...this.selectedNGO.componentList];
        this.comboDataOrganizationalComponent.push({description: '', id: 0, lead: false, parentNgo: undefined, name: NONE})
        this.filteredOptions = this.searchTextBoxControl.valueChanges
          .pipe(
            startWith<string>(''),
            map(name => this._filter(name))
          );
        break;
      case AssignType.USER:
        this.memberService.getNGOMembers(this.selectedNGO).subscribe((result) => {
          this.comboData = result.filter(m => m.function?.id !== this.data.ngoFunction?.id);
          this.filteredOptions = this.searchTextBoxControl.valueChanges
            .pipe(
              startWith<string>(''),
              map(name => this._filter(name))
            );
          this.applicationService.emmitLoading(false);
        }, error => {
          this.applicationService.emmitLoading(false);
        });
        break
    }
  }

  get assignTypes() {
    return AssignType;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openedChange(e) {
    this.searchTextBoxControl.patchValue('');
    if (e === true) {
      this.searchTextBox.nativeElement.focus();
    }
  }

  getPrint(option: MemberDTO | OrganizationalComponentDTO | FunctionDTO) {
    switch (this.assignType) {
      case AssignType.USER:
        option = option as MemberDTO
        return ((option?.user.firstName ?? '') + ' ' + (option?.user.lastName ?? ''));
        break;
      case AssignType.FUNCTION:
        option = option as FunctionDTO
        return (option?.name ?? '')
        break;
      case AssignType.ORGANIZATIONAL_UNIT:
        option = option as OrganizationalComponentDTO
        return (option?.name ?? '')
        break;
    }

  }

  clearSearch($event: MouseEvent) {
    event.stopPropagation();
    this.searchTextBoxControl.patchValue('');
  }

  selectionChange(event) {
    if (event.isUserInput) {
      switch (this.assignType) {
        case AssignType.USER:
          this.selectedOption = event.source.value;
          break;
        case AssignType.FUNCTION:
          this.selectedOptionFunction = event.source.value
          break;
        case AssignType.ORGANIZATIONAL_UNIT:
          this.selectedOptionOrganizationalComponent = event.source.value;
      }
    }
  }

  private _filter(name: string): MemberDTO[] | FunctionDTO[] | OrganizationalComponentDTO[] {
    const filterValue = name.toLowerCase();
    switch (this.assignType) {
      case AssignType.ORGANIZATIONAL_UNIT:
        this.selectFormControl.patchValue(this.selectedValuesOrganizationalComponent)
        return this.comboDataOrganizationalComponent.filter(option => (option.name ?? '').toLowerCase().indexOf(filterValue) === 0);
        break;
      case AssignType.FUNCTION:
        this.selectFormControl.patchValue(this.selectedValuesFunction)
        return this.comboDataFunction.filter(option => (option.name ?? '').toLowerCase().indexOf(filterValue) === 0);
        break;
      case AssignType.USER:
        this.selectFormControl.patchValue(this.selectedValues);
        return this.comboData.filter(option => ((option.user.firstName ?? '') + ' ' + (option.user.lastName ?? '')).toLowerCase().indexOf(filterValue) === 0);
        break;
    }
  }


  conclude() {
    this.applicationService.emmitLoading(true);
    let members: MemberDTO[];
    switch (this.assignType) {
      case AssignType.ORGANIZATIONAL_UNIT:
        members = this.data.members;
        members.forEach(m => {
          m.organizationalComponent = this.selectedOptionOrganizationalComponent.id !== 0 ? this.selectedOptionOrganizationalComponent : null;
          this.memberService.updateMember(m).subscribe((result2) => {
            this.applicationService.emmitLoading(false);
            this.dialogRef.close();
          }, error => {
            this.applicationService.emmitLoading(false);
          })
        })
        break;
      case AssignType.FUNCTION:
        members = this.data.members;
        members.forEach(m => {
          m.function = this.selectedOptionFunction.id !== 0 ? this.selectedOptionFunction : null;
          this.memberService.updateMember(m).subscribe((result2) => {
            this.applicationService.emmitLoading(false);
            this.dialogRef.close();
          }, error => {
            this.applicationService.emmitLoading(false);
          })
        })
        break;
      case AssignType.USER:
        this.selectedOption.function = this.data.ngoFunction;
        this.memberService.updateMember(this.selectedOption).subscribe((result2) => {
          this.applicationService.emmitLoading(false);
          this.dialogRef.close();
        }, error => {
          this.applicationService.emmitLoading(false);
        })
        break;
    }
  }
}
