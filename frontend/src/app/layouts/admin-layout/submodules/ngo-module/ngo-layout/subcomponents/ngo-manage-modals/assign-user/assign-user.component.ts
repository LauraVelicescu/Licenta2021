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

@Component({
  selector: 'app-assign-user',
  templateUrl: './assign-user.component.html',
  styleUrls: ['./assign-user.component.scss']
})
export class AssignUserComponent implements OnInit {

  @ViewChild('search') searchTextBox: ElementRef;

  selectFormControl = new FormControl();
  searchTextboxControl = new FormControl();
  filteredOptions: Observable<any[]>;
  selectedOption: MemberDTO;
  selectedValues: MemberDTO[] = [];
  comboData: MemberDTO[] = [];
  selectedNGO: NgoDTO;
  constructor(public dialogRef: MatDialogRef<AssignUserComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private applicationService: ApplicationService,
              private notificationService: NotificationService,
              private ngoService: NGOService) { }

  ngOnInit(): void {

    this.selectedNGO = this.data.ngo;
    console.log(this.selectedNGO);
    this.applicationService.emmitLoading(true);
    this.ngoService.getNGOMembers(this.selectedNGO).subscribe((result) => {
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

  onNoClick(): void {
    this.dialogRef.close();
  }

  openedChange(e) {
    this.searchTextboxControl.patchValue('');
    if (e === true) {
      this.searchTextBox.nativeElement.focus();
    }
  }

  getPrint(option: MemberDTO) {
    return ((option?.user.firstName ?? '') + ' ' + (option?.user.lastName ?? ''));
  }

  clearSearch($event: MouseEvent) {
    event.stopPropagation();
    this.searchTextboxControl.patchValue('');
  }

  selectionChange(event) {
    if (event.isUserInput) {
      this.selectedOption = event.source.value;
      this.load();
    }
  }

  private _filter(name: string): MemberDTO[] {
    const filterValue = name.toLowerCase();
    this.selectFormControl.patchValue(this.selectedValues);
    return this.comboData.filter(option => ((option.user.firstName ?? '') + ' ' + (option.user.lastName ?? '')).toLowerCase().indexOf(filterValue) === 0);
  }

  private load() {

  }

  conclude() {
    this.applicationService.emmitLoading(true);
    console.log(this.selectedOption);
    console.log(this.data.ngoFunction.id);
    this.ngoService.setMemberFunction(this.selectedOption, this.data.ngoFunction).subscribe((result2) => {
      this.applicationService.emmitLoading(false);
      this.dialogRef.close();
    }, error => {
      this.applicationService.emmitLoading(false);
    })
  }
}
