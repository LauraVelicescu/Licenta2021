import {Injectable} from '@angular/core';
import {MainServiceService} from '../main/main-service.service';
import {ProjectDTO} from '../../dto/ProjectDTO';
import {catchError, map} from 'rxjs/operators';
import {plainToClass} from 'class-transformer';
import {ProjectTaskDTO} from '../../dto/ProjectTaskDTO';
import {UserDTO} from '../../dto/UserDTO';
import {TaskAttachmentDTO} from '../../dto/TaskAttachmentDTO';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private rootURL = 'api/task';
  private findTasksByProjectURL = '/:projectId'
  private createTaskURL = '/:projectId'
  private updateTaskURL = '/:projectId'
  private deleteTaskURL = '/:taskId'
  private uploadFileURL = '/upload/:taskId'
  private findAllUploadsURL = '/upload/:taskId'
  private deleteUploadURL = '/upload/:attachmentId'

  constructor(private mainService: MainServiceService) {

  }

  public findTasksByProject(project: ProjectDTO) {
    return this.mainService.get(this.rootURL + this.findTasksByProjectURL.replace(':projectId', project.id.toString())).pipe(map((result: ProjectTaskDTO[]) => {
      return plainToClass(ProjectTaskDTO, result, {enableCircularCheck: false});
    }), catchError(err => {
      this.mainService.httpError(err);
      throw new Error(err.error.message);
    }));
  }

  public createTask(project: ProjectDTO, task: ProjectTaskDTO) {
    return this.mainService.post(this.rootURL + this.createTaskURL.replace(':projectId', project.id.toString()), task).pipe(map((result) => {
      return result;
    }), catchError(err => {
      this.mainService.httpError(err);
      throw new Error(err.error.message);
    }));
  }

  public updateTask(project: ProjectDTO, task: ProjectTaskDTO) {
    return this.mainService.put(this.rootURL + this.updateTaskURL.replace(':projectId', project.id.toString()), task).pipe(map((result) => {
      return result;
    }), catchError(err => {
      this.mainService.httpError(err);
      throw new Error(err.error.message);
    }));
  }

  public deleteTask(task: ProjectTaskDTO) {
    return this.mainService.delete(this.rootURL + this.deleteTaskURL.replace(':taskId', task.id.toString())).pipe(map((result) => {
      return result;
    }), catchError(err => {
      this.mainService.httpError(err);
      throw new Error(err.error.message);
    }));
  }

  public uploadFile(fileFormData: any, task: ProjectTaskDTO) {
    return this.mainService.postFile(this.rootURL + this.uploadFileURL.replace(':taskId', task.id.toString()), fileFormData).pipe(map((result) => {
      return result;
    }), catchError(err => {
      this.mainService.httpError(err);
      throw new Error(err.error.message);
    }));
  }


  public findUploadsByTask(task: ProjectTaskDTO) {
    return this.mainService.get(this.rootURL + this.findAllUploadsURL.replace(':taskId', task.id.toString())).pipe(map((result: TaskAttachmentDTO[]) => {
      return plainToClass(TaskAttachmentDTO, result, {enableCircularCheck: false});
    }), catchError(err => {
      this.mainService.httpError(err);
      throw new Error(err.error.message);
    }));
  }

  public deleteAttachment(attachmentDTO: TaskAttachmentDTO) {
    return this.mainService.delete(this.rootURL + this.deleteUploadURL.replace(':attachment', attachmentDTO.id.toString())).pipe(map((result) => {
      return result;
    }), catchError(err => {
      this.mainService.httpError(err);
      throw new Error(err.error.message);
    }));
  }

}
