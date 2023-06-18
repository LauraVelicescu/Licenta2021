import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProjectDTO} from '../../../../../../../../shared/dto/ProjectDTO';
import {MatTableDataSource} from '@angular/material/table';
import {ProjectExpenseDTO} from '../../../../../../../../shared/dto/ProjectExpenseDTO';
import {NgoDTO} from '../../../../../../../../shared/dto/NgoDTO';
import {ProjectAction} from '../../project-hub.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProjectService} from '../../../../../../../../shared/services/project-service/project.service';
import {ApplicationService} from '../../../../../../../../shared/services/application/application.service';
import {NotificationService} from '../../../../../../../../shared/services/notification-service/notification.service';
import {MemberService} from '../../../../../../../../shared/services/member-service/member.service';
import {formatDate} from '@angular/common';
import {FinancialService} from '../../../../../../../../shared/services/financial/financial.service';
import {saveAs} from 'file-saver';
import {Role} from '../../../../../../../../shared/util/ApplicationRoutesInfo';
import {SecurityStorage} from '../../../../../../../../security/SecurityStorage';

@Component({
  selector: 'app-project-expenses',
  templateUrl: './project-expenses.component.html',
  styleUrls: ['./project-expenses.component.scss']
})
export class ProjectExpensesComponent implements OnInit {


  selectedFile: File;

  displayedColumns: string[] = ['no', 'name', 'expenseOwner', 'project', 'task', 'date', 'amount', 'status', 'actions'];
  dataSource = new MatTableDataSource<ProjectExpenseDTO>([]);


  @Input()
  selectedProject: ProjectDTO;

  @Input()
  private selectedNGO: NgoDTO;

  currentAction: ProjectAction = undefined;
  private persistState: boolean;

  private selectedProjectExpense: ProjectExpenseDTO = undefined;
  expenseForm: FormGroup;
  private afterSaveFileHook: boolean = false;
  selectedFileName: string = '';

  @Output()
  emmitExpenseSave = new EventEmitter();

  constructor(private projectService: ProjectService,
              private applicationService: ApplicationService,
              private notificationService: NotificationService,
              private formBuilder: FormBuilder,
              private memberService: MemberService,
              private financialService: FinancialService,
              private securityStorage: SecurityStorage
  ) {
  }

  ngOnInit(): void {
    this.load();

    this.expenseForm = this.formBuilder.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        amount: ['', Validators.required],
      }
    )
  }

  getName(element: ProjectExpenseDTO) {
    return element.name;
  }

  getDate(element: ProjectExpenseDTO) {
    if (element?.date) {
      let x = formatDate(element.date, 'yyyy-MM-dd', 'en-US');
      return x;
    }
  }

  public formatDateLocal(date: Date) {
    if (date) {
      let x = formatDate(date, 'yyyy-MM-dd', 'en-US');
      return x;
    }
  }

  load() {
    this.persistState = false;
    this.currentAction = undefined;
    this.selectedProjectExpense = undefined;
    this.applicationService.emmitLoading(true);
    this.financialService.getAllProjectExpensesByProjectId(this.selectedProject).subscribe((result) => {
      this.applicationService.emmitLoading(false);
      this.dataSource.data = result;
    }, error => {
      this.applicationService.emmitLoading(false);
      this.notificationService.error(error);
    })
  }

  onSubmit(currentAction: ProjectAction) {

    if (currentAction === ProjectAction.EXPENSE_ADD || currentAction === ProjectAction.EXPENSE_EDIT) {
      if (this.expenseForm.invalid) {
        return
      } else {
        let projectExpense: ProjectExpenseDTO = this.selectedProjectExpense;
        projectExpense.project = this.selectedProject;
        projectExpense.date = new Date();
        if (projectExpense.id) {
          this.applicationService.emmitLoading(true);
          this.financialService.updateProjectExpense(projectExpense).subscribe((result) => {
              if (this.afterSaveFileHook) {
                this.afterSaveFileHook = false;
                const uploadImageData = new FormData();
                uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
                this.financialService.updateDocument(uploadImageData, projectExpense).subscribe(() => {
                });
              }
              this.applicationService.emmitLoading(false);
              this.load();
              this.emmitExpenseSave.emit();
            }, error => {
              this.applicationService.emmitLoading(false);
              this.notificationService.error(error);
            }
          )
        } else {
          projectExpense.status = 0;
          this.financialService.createProjectExpense(projectExpense).subscribe((result) => {
              if (this.afterSaveFileHook) {
                this.afterSaveFileHook = false;
                const uploadImageData = new FormData();
                uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
                this.financialService.updateDocument(uploadImageData, result).subscribe(() => {
                });
              }
              this.applicationService.emmitLoading(false);
              this.load();
              this.emmitExpenseSave.emit();
            }, error => {
              this.applicationService.emmitLoading(false);
              this.notificationService.error(error);
            }
          )
        }
      }
    } else if (currentAction === ProjectAction.EXPENSE_DELETE) {
      this.applicationService.emmitLoading(true);
      this.financialService.deleteProjectExpense(this.selectedProjectExpense).subscribe((result) => {
        this.applicationService.emmitLoading(false);
        this.load();
        this.emmitExpenseSave.emit();
      })
    }
  }

  cancelAction(currentAction: ProjectAction) {
    this.persistState = false;
    this.currentAction = undefined;
    this.selectedProjectExpense = undefined;
    this.selectedFile = undefined;
    this.selectedFileName = undefined;
  }

  get actions() {
    return ProjectAction;
  }

  emitAction(action: ProjectAction, projectExpense?: ProjectExpenseDTO) {
    this.currentAction = action;
    this.selectedFile = undefined;
    if (this.currentAction === ProjectAction.EXPENSE_ADD) {
      this.persistState = true;
      this.selectedProjectExpense = new ProjectExpenseDTO();
    } else if (this.currentAction === ProjectAction.EXPENSE_EDIT) {
      this.persistState = true;
      this.selectedProjectExpense = {...projectExpense};
      if (projectExpense.fileName) {
        this.selectedFileName = this.selectedProjectExpense.fileName + this.selectedProjectExpense.fileExtension;
      }
    } else if (this.currentAction === ProjectAction.EXPENSE_DELETE) {
      this.selectedProjectExpense = projectExpense;
      this.onSubmit(ProjectAction.EXPENSE_DELETE)
    } else if (this.currentAction === ProjectAction.EXPENSE_DENY || this.currentAction === ProjectAction.EXPENSE_APPROVE) {
      this.applicationService.emmitLoading(true);
      if (this.currentAction === ProjectAction.EXPENSE_DENY) {
        this.financialService.updateProjectExpenseState(projectExpense, 2).subscribe((result) => {
          this.applicationService.emmitLoading(false);
          this.load();
          this.emmitExpenseSave.emit();
        }, error => {
          this.applicationService.emmitLoading(true);
          this.notificationService.error(error);
        })
      } else {
        this.financialService.updateProjectExpenseState(projectExpense, 1).subscribe((result) => {
          this.applicationService.emmitLoading(false);
          this.load();
          this.emmitExpenseSave.emit();
        }, error => {
          this.applicationService.emmitLoading(false);
          this.notificationService.error(error);
        })
      }
    }
  }


  canView() {
    return this.applicationService.globalPrivileges.includes(Role.ADMIN) || this.applicationService.globalPrivileges.includes(Role.NGO_ADMIN)
  }

  getExpenseOwner(element: ProjectExpenseDTO) {
    return (element?.expenseOwner?.member?.user?.lastName ?? '') + ' ' + (element?.expenseOwner?.member?.user?.firstName ?? '');
  }

  getProject(element: ProjectExpenseDTO) {
    return element?.project?.name;
  }

  getTask(element: ProjectExpenseDTO) {
    return element?.task ? element.task.name : '-';
  }

  getStatus(element: ProjectExpenseDTO) {

    switch (element.status) {
      case 0:
        return 'Under Review'
      case 1:
        return 'Accepted'
      case 2:
        return 'Rejected'
    }
  }

  onFileChanged(event) {

    this.selectedFile = event.target.files[0];
    this.selectedFileName = this.selectedFile.name;
    this.afterSaveFileHook = true;
  }

  downloadFile(base64: any, fileName: any, contentType: string) {
    const src = `data:${contentType};base64,${base64}`;
    const link = document.createElement('a')
    link.href = src
    link.download = fileName
    link.click()

    link.remove()
  }

  download() {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.downloadFile((reader.result as string).split('base64,')[1], this.selectedFile.name, this.selectedFile.type)
      }
      reader.readAsDataURL(this.selectedFile);
    } else {
      this.financialService.downloadDownload(this.selectedProjectExpense).subscribe(blob => {
        saveAs(blob, this.selectedProjectExpense.fileName + this.selectedProjectExpense.fileExtension);
      })
    }
  }

  canViewOwn(element: ProjectExpenseDTO) {

    console.log(element?.expenseOwner?.member?.user?.id);
    return (this.applicationService.globalPrivileges.includes(Role.NGO_ADMIN) || this.applicationService.globalPrivileges.includes(Role.ADMIN))
      || element?.expenseOwner?.member?.user?.id === this.securityStorage.getLoggedUser();
  }
}
