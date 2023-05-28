import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {ProjectDTO} from '../../../../../../shared/dto/ProjectDTO';
import {ProjectService} from '../../../../../../shared/services/project-service/project.service';
import {ApplicationService} from '../../../../../../shared/services/application/application.service';
import {NotificationService} from '../../../../../../shared/services/notification-service/notification.service';
import {map, startWith} from 'rxjs/operators';
import {ProjectTaskDTO} from '../../../../../../shared/dto/ProjectTaskDTO';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {TaskService} from '../../../../../../shared/services/task-service/task.service';
import {formatDate} from '@angular/common';
import {DomSanitizer} from '@angular/platform-browser';

export enum TaskStatus {
  TO_DO = 'TO_DO',
  IN_PROGRESS = 'IN_PROGRESS',
  BLOCKED = 'BLOCKED',
  DONE = 'DONE'
}

@Component({
  selector: 'app-project-board',
  templateUrl: './project-board.component.html',
  styleUrls: ['./project-board.component.scss'],
})
export class ProjectBoardComponent implements OnInit {


  @ViewChild('search') searchTextBox: ElementRef;

  selectFormControl = new FormControl();
  searchTextboxControl = new FormControl();
  filteredOptions: Observable<any[]>;
  selectedValues: ProjectDTO[] = [];
  comboData: ProjectDTO[] = [];

  selectedProject: ProjectDTO;

  displayedStatusColumns: TaskStatus[] = [TaskStatus.TO_DO, TaskStatus.IN_PROGRESS, TaskStatus.BLOCKED, TaskStatus.DONE]

  statusTaskMap: Map<TaskStatus, ProjectTaskDTO[]> = new Map<TaskStatus, ProjectTaskDTO[]>();

  constructor(private projectService: ProjectService,
              private applicationService: ApplicationService,
              private notificationService: NotificationService,
              private formBuilder: FormBuilder,
              private taskService: TaskService,
              private sanitized: DomSanitizer) {
  }

  ngOnInit(): void {

    this.displayedStatusColumns.forEach(s => {
      this.statusTaskMap.set(s, []);
    })

    this.applicationService.emmitLoading(true);
    this.projectService.findMyProjects().subscribe((result) => {
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

  openedChange(e) {
    this.searchTextboxControl.patchValue('');
    if (e === true) {
      this.searchTextBox.nativeElement.focus();
    }
  }

  getPrint(option: ProjectDTO) {
    return ((option?.name ?? '') + ' [' + (option?.ngo?.acronym ?? '')) + ']';
  }

  clearSearch(event) {
    event.stopPropagation();
    this.searchTextboxControl.patchValue('');
  }

  selectionChange(event) {
    if (event.isUserInput) {
      this.selectedProject = event.source.value;
      this.load();
    }
  }

  private _filter(name: string): ProjectDTO[] {
    const filterValue = name.toLowerCase();
    this.selectFormControl.patchValue(this.selectedValues);
    return this.comboData.filter(option => ((option.name ?? '')).toLowerCase().indexOf(filterValue) === 0);
  }

  private load() {

    this.applicationService.emmitLoading(true);
    this.taskService.findTasksByProject(this.selectedProject).subscribe((result) => {
      result.forEach(pt => {
        this.statusTaskMap.get(pt.taskStatus).push(pt);
      })
      this.applicationService.emmitLoading(false);
    }, error => {
      this.applicationService.emmitLoading(false);
      this.notificationService.error(error);
    });
  }

  changeStatus(event: CdkDragDrop<ProjectTaskDTO[]>, newStatus: TaskStatus) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      let task = event.item.data as ProjectTaskDTO;
      task.taskStatus = newStatus;
      this.taskService.updateTask(this.selectedProject, task).subscribe((result) => {
      }, error => {
        this.notificationService.error(error);
      })
    }
  }

  getPrintableStatus(status: TaskStatus) {
    return status.replace('_', ' ');
  }

  public formatDateLocal(date: Date) {
    if (date) {
      let x = formatDate(date, 'yyyy-MM-dd', 'en-US');
      return x;
    }
  }

  hasProfilePicture(item: ProjectTaskDTO) {

  }

  getUserLogo(item: ProjectTaskDTO) {
    if (item.projectMember.member.user.profilePicture) {
      let base64Data = item.projectMember.member.user.profilePicture;
      let retrievedImage = 'data:image/jpeg;base64,' + base64Data;
      return this.sanitized.bypassSecurityTrustHtml('<img  src=\'' + retrievedImage + '\' style=\'max-width: 50px!important;border-radius: 50%;\' / > ');
    } else {
      return this.sanitized.bypassSecurityTrustHtml('<button disabled style=\'border-radius: 50%\'>' + item.projectMember.member.user.firstName.substring(0, 1) + item.projectMember.member.user.lastName.substring(0, 1) + '</button>')
    }
  }
}
