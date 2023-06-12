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
import {UserRoleDTO} from '../../../../../../../shared/dto/UserRoleDTO';
import {UserDTO} from '../../../../../../../shared/dto/UserDTO';

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
  dataSourceUserRoles = new MatTableDataSource<UserRoleDTO>([]);

  displayedColumnsUserRoles: string[] = ['id', 'userName', 'ngoName', 'actions'];

  dataSourceUser = new MatTableDataSource<UserDTO>([]);
  displayedColumnsUser: string[] = ['id', 'userName'];
  selectionUser = new SelectionModel<UserDTO>(true, []);

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
    if (this.selectedRole.ngoEligible) {
      this.selectionMembers.clear();
      this.applicationService.emmitLoading(true);
      this.userService.getUserRoleByRole(this.selectedRole).subscribe((result) => {
        this.applicationService.emmitLoading(false);
        this.dataSourceUserRoles.data = result;
        this.applicationService.emmitLoading(true);
        this.memberService.getNGOMembers(this.selectedNgo).subscribe((members) => {
          this.applicationService.emmitLoading(false);
          members = members.filter(m => {
            for (let r of result) {
              if (r.user.id === m.user.id && r.ngo.id === m.ngo.id) {
                return false;
              }
            }
            return true;
          })
          this.dataSourceMembers.data = members;
        }, error => {
          this.applicationService.emmitLoading(false);
          this.notificationService.error(error);
        })
      }, error => {
        this.applicationService.emmitLoading(false);
        this.notificationService.error(error);
      })
    }
  }

  private onSelectRole() {
    if (this.selectedRole.ngoEligible) {
      this.selectedNgo = undefined;
      this.dataSourceMembers.data = []
      this.applicationService.emmitLoading(true);
      this.ngoService.findAllNGOs().subscribe((result) => {
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
    } else {
      this.selectedNgo = undefined;
      this.selectionUser.clear();
      this.applicationService.emmitLoading(true);
      this.userService.getUserRoleByRole(this.selectedRole).subscribe((result) => {
        this.applicationService.emmitLoading(false);
        this.dataSourceUserRoles.data = result;
        this.applicationService.emmitLoading(true);
        this.userService.findUsers().subscribe((users) => {
          this.applicationService.emmitLoading(false);
          users = users.filter(u => {
            for (let r of result) {
              if (r.user.id === u.id) {
                return false;
              }
            }
            return true;
          })
          this.dataSourceUser.data = users;
        }, error => {
          this.applicationService.emmitLoading(false);
          this.notificationService.error(error);
        })
      }, error => {
        this.applicationService.emmitLoading(false);
        this.notificationService.error(error);
      })
    }
  }

  getOrganizationalComponent(element: MemberDTO) {
    return element.organizationalComponent ? element.organizationalComponent.name : '-';
  }


  getName(element: MemberDTO) {
    return element.user.firstName + ' ' + element.user.lastName;
  }

  getNameForUserRole(element: UserRoleDTO) {
    return element.user.firstName + ' ' + element.user.lastName;
  }

  geNgoNameForUserRole(element: UserRoleDTO) {
    return element.ngo?.name;
  }

  getFunction(element: MemberDTO) {
    return element.function ? element.function.name : '-';
  }

  saveRolesMembers() {
    if (this.selectedRole.ngoEligible) {
      if (this.selectionMembers.selected.length > 0) {
        this.applicationService.emmitLoading(true);
        this.userService.setRolesForMember(this.selectedRole, this.selectionMembers.selected).subscribe((result) => {
          this.selectedNgo = undefined;
          this.dataSourceMembers.data = [];
          this.selectedRole = undefined;
          this.dataSourceUserRoles.data = []
          this.applicationService.emmitLoading(false);
        }, error => {
          this.applicationService.emmitLoading(false);
          this.notificationService.error(error);
        })
      }
    } else {
      if (this.selectionUser.selected.length > 0) {
        this.applicationService.emmitLoading(true);
        this.userService.setRolesForMember(this.selectedRole, this.selectionUser.selected).subscribe((result) => {
          this.selectedNgo = undefined;
          this.dataSourceUser.data = [];
          this.selectedRole = undefined;
          this.dataSourceUserRoles.data = []
          this.applicationService.emmitLoading(false);
        }, error => {
          this.applicationService.emmitLoading(false);
          this.notificationService.error(error);
        })
      }
    }
  }

  cancelMember() {
    this.selectedNgo = undefined;
    this.dataSourceMembers.data = [];
    this.selectedRole = undefined;
    this.dataSourceUserRoles.data = []
  }

  deleteRoleForUser(element: UserRoleDTO) {
    this.applicationService.emmitLoading(true);
    this.userService.deleteUserRole(element).subscribe((result) => {
      this.applicationService.emmitLoading(false);
      if (this.selectedRole.ngoEligible) {
        this.load();
      } else {
        this.onSelectRole()
      }
    }, error => {
      this.applicationService.emmitLoading(false);
      this.notificationService.error(error);
    })
  }

  getUsername(element: UserDTO) {
    return element.firstName + ' ' + element.lastName
  }
}
