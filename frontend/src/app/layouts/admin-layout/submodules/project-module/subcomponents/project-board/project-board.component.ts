import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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
import {ProjectMemberDTO} from '../../../../../../shared/dto/ProjectMemberDTO';
import {MatOptionSelectionChange} from '@angular/material/core';
import {TaskAttachmentDTO} from '../../../../../../shared/dto/TaskAttachmentDTO';
import {saveAs} from 'file-saver';
import {TaskHistoryDTO} from '../../../../../../shared/dto/TaskHistoryDTO';
import {Router} from '@angular/router';

export enum TaskStatus {
  TO_DO = 'TO_DO',
  IN_PROGRESS = 'IN_PROGRESS',
  BLOCKED = 'BLOCKED',
  DONE = 'DONE'
}

export enum TaskAction {
  ADD,
  EDIT,
  DELETE,
  VIEW,
  DELETE_ATTACHMENT,
  DOWNLOAD_ATTACHMENT
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
  taskForm: FormGroup;

  displayedStatusColumns: TaskStatus[] = [TaskStatus.TO_DO, TaskStatus.IN_PROGRESS, TaskStatus.BLOCKED, TaskStatus.DONE]

  statusTaskMap: Map<TaskStatus, ProjectTaskDTO[]> = new Map<TaskStatus, ProjectTaskDTO[]>();
  persistState: boolean = false;
  private currentAction: TaskAction;
  private selectedTask: ProjectTaskDTO;

  @ViewChild('searchMember') searchTextBoxMember: ElementRef;
  selectFormControlMember = new FormControl();
  searchTextboxControlMember = new FormControl();
  private selectedMember: ProjectMemberDTO;
  comboDataMember: ProjectMemberDTO[] = [];
  selectedValuesMember: ProjectMemberDTO[] = [];
  filteredOptionsMember: Observable<any[]>;
  private viewState: boolean = false;


  attachments: TaskAttachmentDTO[] = [];

  history: TaskHistoryDTO[] = [];
  newChat: string;

  constructor(private projectService: ProjectService,
              private applicationService: ApplicationService,
              private notificationService: NotificationService,
              private formBuilder: FormBuilder,
              private taskService: TaskService,
              private sanitized: DomSanitizer,
              private router: Router) {
    if (this.router.getCurrentNavigation().extras?.state?.selectedProject) {
      this.selectedProject = this.router.getCurrentNavigation().extras.state.selectedProject
      this.load();
    }
  }


  ngOnInit(): void {

    
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


    this.taskForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      deadline: ['', Validators.required]
    })
  }

  openedChange(e) {
    this.searchTextboxControl.patchValue('');
    if (e === true) {
      this.searchTextBox.nativeElement.focus();
    }
  }

  getPrint(option: ProjectDTO) {
    if (option) {
      return ((option?.name ?? '') + ' [' + (option?.ngo?.acronym ?? '')) + ']';
    }
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

    this.viewState = false;
    this.persistState = false;
    this.currentAction = undefined;
    this.selectedTask = undefined;
    this.selectedMember = undefined;
    this.applicationService.emmitLoading(true);
    this.statusTaskMap.clear()

    this.displayedStatusColumns.forEach(s => {
      this.statusTaskMap.set(s, []);
    })
    this.taskService.findTasksByProject(this.selectedProject).subscribe((result) => {
      result.forEach(pt => {
        this.statusTaskMap.get(pt.taskStatus).push(pt);
      })
      this.applicationService.emmitLoading(false);
    }, error => {
      this.applicationService.emmitLoading(false);
      this.notificationService.error(error);
    });

    this.loadDropDowns();
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

  get taskActions() {
    return TaskAction;
  }

  emmitAction(action: TaskAction, payload?: ProjectTaskDTO) {

    this.currentAction = action;
    if (action === TaskAction.ADD) {
      this.persistState = true;
      this.selectedTask = new ProjectTaskDTO();
    } else if (action === TaskAction.EDIT) {
      this.persistState = true;
      this.selectedTask = payload;
      this.selectedMember = payload.projectMember
    } else if (action === TaskAction.DELETE) {
      this.selectedTask = payload;
      this.onSubmit(TaskAction.DELETE);
    } else if (action === TaskAction.VIEW) {
      this.persistState = true;
      this.viewState = true;
      this.selectedTask = payload;
      this.selectedMember = payload.projectMember
      this.loadAdditionalElements();
    }
  }

  onSubmit(currentAction: TaskAction) {
    if (currentAction === TaskAction.ADD || currentAction === TaskAction.EDIT) {
      if (this.taskForm.invalid) {
        return
      } else {
        let task: ProjectTaskDTO = this.selectedTask;
        if (this.selectedMember) {
          task.projectMember = this.selectedMember;
        }

        if (task.id) {
          this.applicationService.emmitLoading(true);
          this.taskService.updateTask(this.selectedProject, task).subscribe((result) => {
              this.applicationService.emmitLoading(false);
              this.load();
            }, error => {
              this.applicationService.emmitLoading(false);
              this.notificationService.error(error);
            }
          )
        } else {
          task.createdDate = new Date();
          task.taskStatus = TaskStatus.TO_DO;
          this.taskService.createTask(this.selectedProject, task).subscribe((result) => {
              this.applicationService.emmitLoading(false);
              this.load();
            }, error => {
              this.applicationService.emmitLoading(false);
              this.notificationService.error(error);
            }
          )
        }
      }
    } else if (currentAction === TaskAction.DELETE) {
      this.taskService.deleteTask(this.selectedTask).subscribe((result) => {
          this.applicationService.emmitLoading(false);
          this.load();
        }, error => {
          this.applicationService.emmitLoading(false);
          this.notificationService.error(error);
        }
      )
    }
  }

  cancelAction(currentAction: TaskAction) {
    this.load();
  }


  openedChangeMember(e) {
    this.searchTextboxControlMember.patchValue('');
    if (e === true) {
      this.searchTextBoxMember?.nativeElement.focus();
    }
  }


  clearSearchMember(event) {
    event.stopPropagation();
    this.searchTextboxControlMember.patchValue('');
    this.selectedMember = undefined;
  }

  selectionChangeMember(event) {
    if (event.isUserInput) {
      this.selectedMember = event.source.value;
    }
  }

  private _filterMember(name: string): ProjectMemberDTO[] {
    const filterValue = name.toLowerCase();
    this.selectFormControlMember.patchValue(this.selectedValuesMember);
    return this.comboDataMember.filter(option => ((option.member.user.firstName ?? '') + ' ' + (option.member.user.lastName ?? '') + ' ' + (option.projectPosition?.name ?? '')).toLowerCase().indexOf(filterValue) === 0);
  }

  getPrintMember(option: ProjectMemberDTO) {
    if (option) {
      return option.member.user.firstName + ' ' + option.member.user.lastName;
    } else {
      return ''
    }
  }

  private loadDropDowns() {
    this.applicationService.emmitLoading(true);
    this.projectService.findProjectMembers(this.selectedProject).subscribe((result) => {
      this.applicationService.emmitLoading(false);
      this.comboDataMember = result;
      this.filteredOptionsMember = this.searchTextboxControlMember.valueChanges
        .pipe(
          startWith<string>(''),
          map(name => this._filterMember(name))
        );
    }, error => {
      this.applicationService.emmitLoading(false);
    });
  }

  selectionChangeMemberFromBoard(event: MatOptionSelectionChange, item: ProjectTaskDTO) {
    if (event.isUserInput) {
      item.projectMember = event.source.value;
      this.applicationService.emmitLoading(true);
      this.taskService.updateTask(this.selectedProject, item).subscribe((result) => {
          this.applicationService.emmitLoading(false);
          this.load();
        }, error => {
          this.applicationService.emmitLoading(false);
          this.notificationService.error(error);
        }
      )
    }
  }

  async onFileUploaded(event, item: ProjectTaskDTO) {
    let selectedFiles: FileList = event.target.files as FileList;
    this.applicationService.emmitLoading(true);
    const uploadImageData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      let file: File = selectedFiles.item(i);
      if (file) {
        uploadImageData.append('imageFile', file, file.name);
      }
    }
    if (uploadImageData.has('imageFile')) {
      this.taskService.uploadFile(uploadImageData, item).subscribe((result) => {
        this.applicationService.emmitLoading(false);
      }, error => {
        this.notificationService.error(error);
        this.applicationService.emmitLoading(false);
      })
    } else {
      this.applicationService.emmitLoading(false);
    }
  }

  private loadAdditionalElements() {

    this.newChat = undefined;
    this.applicationService.emmitLoading(true);
    this.taskService.findUploadsByTask(this.selectedTask).subscribe((result) => {
      this.attachments = result;
      this.applicationService.emmitLoading(false);
    }, error => {
      this.notificationService.error(error);
      this.applicationService.emmitLoading(false);
    })

    this.applicationService.emmitLoading(true);
    this.taskService.findHistoryByTask(this.selectedTask).subscribe((result) => {
      this.history = result;
      this.applicationService.emmitLoading(false);
    }, error => {
      this.notificationService.error(error);
      this.applicationService.emmitLoading(false);
    })
  }

  emmitAttachmentAction(taskAction: TaskAction, item: TaskAttachmentDTO) {

    if (taskAction === TaskAction.DELETE_ATTACHMENT) {
      this.applicationService.emmitLoading(true);
      this.taskService.deleteAttachment(item).subscribe((result) => {
        this.applicationService.emmitLoading(false);
        this.loadAdditionalElements();
      }, error => {
        this.notificationService.error(error);
        this.applicationService.emmitLoading(false);
      })
    } else if (taskAction === TaskAction.DOWNLOAD_ATTACHMENT) {
      let content: string = item.file as string;
      this.downloadFile(content, item.name + item.extension, item.contentType);
    }
  }

  downloadFile(base64: any, fileName: any, contentType: string) {
    const src = `data:${contentType};base64,${base64}`;
    const link = document.createElement('a')
    link.href = src
    link.download = fileName
    link.click()

    link.remove()
  }

  getNow() {
    return new Date();
  }

  updateHistory() {
    if (this.newChat) {
      this.applicationService.emmitLoading(true);
      this.taskService.addChatHistoryByTask(this.newChat, this.selectedTask).subscribe((result) => {
        this.applicationService.emmitLoading(false);
        this.loadAdditionalElements();
      }, error => {
        this.notificationService.error(error);
        this.applicationService.emmitLoading(false);
      })
    }
  }
}
