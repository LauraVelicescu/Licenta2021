import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgoDTO} from '../../../../../../../shared/dto/NgoDTO';
import {NGOService} from '../../../../../../../shared/services/ngo-service/ngo.service';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {MatPaginator} from "@angular/material/paginator";
import {NotificationService} from "../../../../../../../shared/services/notification-service/notification.service";
import {ApplicationService} from "../../../../../../../shared/services/application/application.service";
import {AuthenticationService} from "../../../../../../../shared/services/authentication/authentication.service";
import {OperationType} from "../../../../../../../shared/util/OperationType";

@Component({
  selector: 'app-ngo-manage',
  templateUrl: './ngo-manage.component.html',
  styleUrls: ['./ngo-manage.component.scss']
})
export class NgoManageComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['id', 'name', 'acronym'];
  dataSource = new MatTableDataSource<NgoDTO>([]);

  persistState: boolean = false;
  NGOForm: FormGroup;
  selectedFile: File;
  currentNGO: NgoDTO
  retrievedImage: any;
  base64Data: any;
  message: string;
  imageName: any;

  selection = new SelectionModel<NgoDTO>(true, []);

  @ViewChild("paginator") paginator: MatPaginator;
  length: number;
  // tslint:disable-next-line:no-shadowed-variable
  constructor(private formBuilder: FormBuilder, private NGOService: NGOService, private notificationService: NotificationService,
  private applicationService: ApplicationService, private authService: AuthenticationService) {}



  ngOnInit(): void {
    this.load();
    this.NGOForm = this.formBuilder.group({
        name:[''],
        acronym: [''],
        foundingDate:[''],
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

  onSubmit()
  {
    if (this.NGOForm.invalid) {
      return;
    } else {
      const ngo: NgoDTO = this.currentNGO;
      ngo.name = this.NGOForm.controls.name.value;
      ngo.foundingDate = this.NGOForm.controls.foundingDate.value;
      ngo.acronym = this.NGOForm.controls.acronym.value;
      ngo.facebookLink = this.NGOForm.controls.facebookLink.value;
      ngo.twitterLink = this.NGOForm.controls.twitterLink.value;
      ngo.linkedinLink = this.NGOForm.controls.linkedinLink.value;
      ngo.description = this.NGOForm.controls.description.value;
      if (ngo.id) {
        this.applicationService.emmitLoading(true);
        this.NGOService.update(ngo).subscribe((result) => {
            this.applicationService.emmitLoading(false);
            this.load();
          }, error => {
            this.applicationService.emmitLoading(false);
            this.notificationService.error(error);
          }
        )
      } else {
        this.NGOService.create(ngo).subscribe((result) => {
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

  handleOperation(operation: OperationType, payload?: NgoDTO[]) {

    switch (operation) {
      case OperationType.ADD:
        this.persistState = true;
        this.currentNGO = new NgoDTO();
        break;
      case OperationType.MODIFY:
        this.persistState = true;
        this.currentNGO = payload[0];
        break;
      case OperationType.DELETE:
        this.applicationService.emmitLoading(true);
        this.NGOService.delete(payload).subscribe((result) => {
          this.applicationService.emmitLoading(false);
          this.load();
        })
        break;
    }
  }

  cancelAction() {
    this.load();
  }
}
