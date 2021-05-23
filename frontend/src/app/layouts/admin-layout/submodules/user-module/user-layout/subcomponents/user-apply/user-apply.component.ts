import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {NgoDTO} from "../../../../../../../shared/dto/NgoDTO";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {SelectionModel} from "@angular/cdk/collections";
import {MatPaginator} from "@angular/material/paginator";
import {NotificationService} from "../../../../../../../shared/services/notification-service/notification.service";
import {ApplicationService} from "../../../../../../../shared/services/application/application.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {OperationType} from "../../../../../../../shared/util/OperationType";
import {NGOService} from "../../../../../../../shared/services/ngo-service/ngo.service";
import {UserService} from "../../../../../../../shared/services/user-service/user.service";
import {MemberRequestDTO} from "../../../../../../../shared/dto/MemberRequestDTO";


@Component({
  selector: 'app-user-apply',
  templateUrl: './user-apply.component.html',
  styleUrls: ['./user-apply.component.scss']
})
export class UserApplyComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'acronym'];
  dataSource = new MatTableDataSource<NgoDTO>([]);

  persistState: boolean = false;
  NGOForm: FormGroup;
  currentNGO: NgoDTO
  message: string;
  imageName: any;

  selection = new SelectionModel<NgoDTO>(true, []);

  @ViewChild('paginator') paginator: MatPaginator;
  length: number;

  // tslint:disable-next-line:no-shadowed-variable
  constructor(private formBuilder: FormBuilder, private NGOService: NGOService, private notificationService: NotificationService,
              private applicationService: ApplicationService, private matDialog: MatDialog) {
  }


  ngOnInit(): void {
    this.load();
    this.NGOForm = this.formBuilder.group({
        name: [''],
        acronym: [''],
        foundingDate: [''],
        facebookLink: [''],
        twitterLink: [''],
        linkedinLink: [''],
        description: ['']
      }
    )
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.selection = new SelectionModel<NgoDTO>(true, []);
  }

  public get operationType() {
    return OperationType;
  }

  private load() {
    this.dataSource.paginator = this.paginator;
    this.persistState = false;
    this.selection.clear();
    this.applicationService.emmitLoading(true);
    this.NGOService.findNGOsCount().subscribe((number) => {
      this.length = number;
      this.NGOService.findNGOs(this.paginator.pageIndex, this.paginator.pageSize).subscribe((result) => {
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

  onSubmit() {

  }

  handleOperation(operation: OperationType, payload?: NgoDTO[]) {

    switch (operation) {

      case OperationType.APPLY:
        this.currentNGO = payload[0];
        this.openDialog();
        break;
    }
  }

  cancelAction() {
    this.load();
  }

  openDialog(): void {
    const dialogRef = this.matDialog.open(NgoMemberApply, {
      width: '750px',
      data: {ngo: this.currentNGO}
    });
  }
}


@Component({
  selector: 'app-ngo-member-apply',
  templateUrl: 'user_apply_to_ngo.html',
  styleUrls: ['./user-apply.component.scss']
})
export class NgoMemberApply{

  motivation: string;


  constructor(
    public dialogRef: MatDialogRef<NgoMemberApply>,
    @Inject(MAT_DIALOG_DATA) public data2: any,
    private applicationService: ApplicationService,
    private userService: UserService,
    private notificationService: NotificationService) {
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  conclude() {
    let memberRequest: MemberRequestDTO = new MemberRequestDTO();
    memberRequest.ngo = this.data2.ngo;
    memberRequest.motivation = this.motivation;
    this.userService.apply(memberRequest).subscribe((result) => {
      this.notificationService.success("The application was sent.");
    }, error => {
      this.notificationService.error(error);
    })
    this.dialogRef.close();
    // this.dialogRef.close({
    //   motivation: this.motivation
    // });
  }

}



