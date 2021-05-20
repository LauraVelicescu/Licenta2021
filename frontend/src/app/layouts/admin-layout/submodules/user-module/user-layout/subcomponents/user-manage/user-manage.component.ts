import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {UserService} from '../../../../../../../shared/services/user-service/user.service';
import {UserDTO} from '../../../../../../../shared/dto/UserDTO';
import {NotificationService} from '../../../../../../../shared/services/notification-service/notification.service';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.scss']
})
export class UserManageComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'Nume', 'Prenume', 'Este blocat', 'Email'];
  dataSource = new MatTableDataSource<UserDTO>([]);


  selection = new SelectionModel<UserDTO>(false, []);


  @ViewChild(MatPaginator) paginator: MatPaginator;
  length: number;

  constructor(private userService: UserService, private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.load();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.selection = new SelectionModel<UserDTO>(false, []);
  }

  private load() {
    this.userService.findUsersCount().subscribe((number) => {
      this.length = number;
      this.userService.findUsers(this.paginator.pageIndex, this.paginator.pageSize).subscribe((result) => {
        this.dataSource.data = result;
      }, error => {
        this.notificationService.error(error);
      })
    }, error => {
      this.notificationService.error(error);
    })

  }
}
