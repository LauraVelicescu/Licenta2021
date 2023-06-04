import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {ProjectPositionDTO} from '../../../../../../../shared/dto/ProjectPositionDTO';
import {UserService} from '../../../../../../../shared/services/user-service/user.service';
import {ApplicationService} from '../../../../../../../shared/services/application/application.service';
import {RoleDTO} from '../../../../../../../shared/dto/RoleDTO';
import {SelectionModel} from '@angular/cdk/collections';
import {NgoDTO} from '../../../../../../../shared/dto/NgoDTO';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {MemberService} from '../../../../../../../shared/services/member-service/member.service';
import {NotificationService} from '../../../../../../../shared/services/notification-service/notification.service';
import {map, startWith} from 'rxjs/operators';
import {NGOService} from '../../../../../../../shared/services/ngo-service/ngo.service';
import {MemberDTO} from '../../../../../../../shared/dto/MemberDTO';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.scss']
})
export class UserRolesComponent implements OnInit {

  displayedColumns: string[] = ['name', 'description'];
  dataSource = new MatTableDataSource<RoleDTO>([]);

  selection = new SelectionModel<RoleDTO>(false, []);

  @ViewChild('search') searchTextBox: ElementRef;

  selectFormControl = new FormControl();
  searchTextBoxControl = new FormControl();
  filteredOptions: Observable<any[]>;
  selectedValues: NgoDTO[] = [];
  comboData: NgoDTO[] = [];

  selectedRole: RoleDTO;
  private selectedNgo: NgoDTO;


  selectionMembers = new SelectionModel<MemberDTO>(true, []);


  displayedColumnsMember: string[] = ['id', 'name', 'function', 'organizationalUnit'];
  dataSourceMembers = new MatTableDataSource<MemberDTO>([]);
  private selectedMembers: MemberDTO[];

  constructor(private userService: UserService,
              private applicationService: ApplicationService,
              private memberService: MemberService,
              private notificationService: NotificationService,
              private ngoService: NGOService) {
  }

  ngOnInit(): void {
    this.applicationService.emmitLoading(true);
    this.userService.findRoles().subscribe((result) => {
      this.dataSource.data = result;
      this.applicationService.emmitLoading(false);
    }, error => {
      this.applicationService.emmitLoading(false);
    })

    this.selection.changed.asObservable().subscribe(value => {
      console.log('here')
      this.selectedRole = {...value.added[0]};
      if (value.added.length === 0) {
        this.selectedRole = undefined;
      } else {
        if (this.selectedRole?.id) {

          this.onSelectRole();
        }
      }
    });
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


  private load() {
    this.selectionMembers.clear();
    this.applicationService.emmitLoading(true);
    this.memberService.getNGOMembers(this.selectedNgo).subscribe((result) => {
      this.applicationService.emmitLoading(false);
      this.dataSourceMembers.data = result;
    }, error => {
      this.applicationService.emmitLoading(false);
      this.notificationService.error(error);
    })
  }

  private onSelectRole() {
    this.selectedNgo = undefined;
    this.dataSourceMembers.data = []
    this.applicationService.emmitLoading(true);
    this.ngoService.findMyNGOs().subscribe((result) => {
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
  }

  getOrganizationalComponent(element: MemberDTO) {
    return element.organizationalComponent ? element.organizationalComponent.name : '-';
  }


  getName(element: MemberDTO) {
    return element.user.firstName + ' ' + element.user.lastName;
  }

  getFunction(element: MemberDTO) {
    return element.function ? element.function.name : '-';
  }

}
