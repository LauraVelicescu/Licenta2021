import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {UserService} from '../../../../../../../shared/services/user-service/user.service';
import {UserDTO} from '../../../../../../../shared/dto/UserDTO';
import {NotificationService} from '../../../../../../../shared/services/notification-service/notification.service';
import {SelectionModel} from '@angular/cdk/collections';
import {OperationType} from '../../../../../../../shared/util/OperationType';
import {ApplicationService} from '../../../../../../../shared/services/application/application.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthenticationService} from '../../../../../../../shared/services/authentication/authentication.service';
import {formatDate} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.scss']
})
export class UserManageComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['Nume', 'Prenume', 'Este blocat', 'Email'];
  dataSource = new MatTableDataSource<UserDTO>([]);

  persistState: boolean = false;

  userForm: FormGroup;
  currentUser: UserDTO;
  message: string;
  imageName: any;

  selection = new SelectionModel<UserDTO>(true, []);

  @ViewChild('paginator') paginator: MatPaginator;
  length: number;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private notificationService: NotificationService,
              private applicationService: ApplicationService, private authService: AuthenticationService, private matDialog: MatDialog) {
  }

  ngOnInit() {
    this.load();
    this.userForm = this.formBuilder.group({
        emailAddress: [''],
        firstName: [''],
        lastName: [''],
        birthday: [''],
        facebookLink: [''],
        twitterLink: [''],
        linkedinLink: [''],
        aboutMe: ['']
      }
    )
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.selection = new SelectionModel<UserDTO>(true, []);
  }

  public get operationType() {
    return OperationType;
  }

  public formatDate(date: Date) {
    return formatDate(date, 'yyyy-MM-dd', 'en-US');
  }

  private load() {
    this.dataSource.paginator = this.paginator;
    this.persistState = false;
    this.selection.clear();
    this.applicationService.emmitLoading(true);
    this.userService.findUsersCount().subscribe((number) => {
      this.length = number;
      this.userService.findUsers(this.paginator.pageIndex, this.paginator.pageSize).subscribe((result) => {
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

  handleOperation(operation: OperationType, payload?: UserDTO[]) {

    switch (operation) {
      case OperationType.ADD:
        this.persistState = true;
        this.currentUser = new UserDTO();
        break;
      case OperationType.MODIFY:
        this.persistState = true;
        this.currentUser = payload[0];
        break;
      case OperationType.DELETE:
        this.applicationService.emmitLoading(true);
        this.userService.deleteUsers(payload).subscribe((result) => {
          this.applicationService.emmitLoading(false);
          result.forEach(e => {
            this.notificationService.warning(e);
          })
        }, error => {
          this.applicationService.emmitLoading(false);
        });
        this.load();
        break;
      case OperationType.UNLOCK:
        this.applicationService.emmitLoading(true);
        this.userService.blockUsers(payload).subscribe((result) => {
          this.applicationService.emmitLoading(false);
        }, error => {
          this.applicationService.emmitLoading(false);
        });
        this.load();
        break;
      case OperationType.LOCK:
        this.applicationService.emmitLoading(true);
        this.userService.blockUsers(payload).subscribe((result) => {
          this.applicationService.emmitLoading(false);
        }, error => {
          this.applicationService.emmitLoading(false);
        });
        this.load();
        break;
      case OperationType.SEND_EMAIL:
        let dialogRef = this.matDialog.open(UserSendMassEmail, {
          width: "750px",
          panelClass: "card"
        });
        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            this.applicationService.emmitLoading(true);
            this.userService.sendEmail(payload, result.subject, result.body).subscribe((result2) => {
              this.notificationService.info("Emails sent successfully")
              this.applicationService.emmitLoading(false);
            }, error => {
              this.notificationService.error(error);
              this.applicationService.emmitLoading(false);
            })
          }
        })
        break;

    }
  }

  onSubmit() {
    if (this.userForm.invalid) {
      return;
    } else {
      const user: UserDTO = this.currentUser;
      user.emailAddress = this.userForm.controls.emailAddress.value;
      user.firstName = this.userForm.controls.firstName.value;
      user.lastName = this.userForm.controls.lastName.value;
      user.birthday = this.userForm.controls.birthday.value;
      user.facebookLink = this.userForm.controls.facebookLink.value;
      user.twitterLink = this.userForm.controls.twitterLink.value;
      user.linkedinLink = this.userForm.controls.linkedinLink.value;
      user.aboutMe = this.userForm.controls.aboutMe.value;
      if (user.id) {
        this.applicationService.emmitLoading(true);
        this.userService.update(user).subscribe((result) => {
            this.applicationService.emmitLoading(false);
            this.load();
          }, error => {
            this.applicationService.emmitLoading(false);
            this.notificationService.error(error);
          }
        )
      } else {
        user.password = 'qwerty';
        this.authService.register(user).subscribe((result) => {
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

  cancelAction() {
    this.load();
  }

}


@Component({
  selector: 'app-user-send-mass-email',
  templateUrl: 'user_send_mass_email.html',
})
export class UserSendMassEmail {
  subject: any;
  body: any;


  constructor(
    public dialogRef: MatDialogRef<UserSendMassEmail>,
    @Inject(MAT_DIALOG_DATA) public data2: any,
    private applicationService: ApplicationService) {
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  conclude() {
    this.dialogRef.close({
      subject: this.subject,
      body: this.body
    });
  }
}
