import {Injectable} from '@angular/core';
import {NgoDTO} from '../../dto/NgoDTO';
import {MainServiceService} from '../main/main-service.service';
import {catchError, map} from 'rxjs/operators';
import {plainToClass} from 'class-transformer';
import {ProjectDTO} from '../../dto/ProjectDTO';
import {ProjectPositionDTO} from '../../dto/ProjectPositionDTO';
import {ProjectMemberDTO} from '../../dto/ProjectMemberDTO';
import {UserDTO} from '../../dto/UserDTO';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private rootURL = 'api'
  private createURL = '/createProject/:ngoId'
  private updateURL = '/updateProject'
  private deleteURL = '/:projectId'
  private getProjectsURL = '/findProjects/:ngoId'
  private getMyProjectsURL = '/findMyProjects'
  private getProjectsCountURL = '/findProjects/count/:ngoId'
  private getProjectPositionsURL = '/project/:projectId/position'
  private createProjectPositionURL = '/project/:projectId/position'
  private deleteProjectPositionURL = '/project/:projectPositionId/position'
  private getProjectMembersURL = '/project/:projectId/member'
  private createProjectMembersURL = '/project/:projectId/member'
  private deleteProjectMembersURL = '/project/:projectMemberId/member'
  private uploadImageURL = '/project/:projectId/uploadImage'

  constructor(private mainService: MainServiceService) {
  }

  create(project: ProjectDTO, ngo: NgoDTO) {
    return this.mainService.post(this.rootURL + this.createURL.replace(':ngoId', ngo.id.toString()),
      project).pipe(map((result: ProjectDTO) => {
      return result;
    }), catchError(err => {
      throw new Error(err.error.message);
    }));
  }

  createPosition(projectPosition: ProjectPositionDTO, project: ProjectDTO) {
    return this.mainService.post(this.rootURL + this.createProjectPositionURL.replace(':projectId', project.id.toString()), projectPosition).pipe(map((result: ProjectPositionDTO) => {
      return result;
    }), catchError(err => {
      throw new Error(err.error.message);
    }));
  }

  updatePosition(projectPosition: ProjectPositionDTO, project: ProjectDTO) {
    return this.mainService.put(this.rootURL + this.createProjectPositionURL.replace(':projectId', project.id.toString()), projectPosition).pipe(map((result: ProjectPositionDTO) => {
      return result;
    }), catchError(err => {
      throw new Error(err.error.message);
    }));
  }

  deletePosition(projectPosition: ProjectPositionDTO) {
    return this.mainService.delete(this.rootURL + this.deleteProjectPositionURL.replace(':projectPositionId', projectPosition.id.toString())).pipe(map((result) => {
      return result;
    }), catchError(err => {
      throw new Error(err.error.message);
    }));
  }

  update(project: ProjectDTO) {

    return this.mainService.post(this.rootURL + this.updateURL,
      project).pipe(map((result: ProjectDTO) => {
      return result;
    }), catchError(err => {
      throw new Error(err.error.message);
    }));
  }

  delete(project: ProjectDTO) {
    return this.mainService.delete(this.rootURL + this.deleteURL.replace(':projectId', project.id.toString())).pipe(map((result) => {
      return result;
    }), catchError(err => {
      throw new Error(err.error.message);
    }));
  }

  public findProjectsCount(ngo: NgoDTO) {
    return this.mainService.get(this.rootURL + this.getProjectsCountURL.replace(':ngoId', ngo.id.toString())).pipe(map((result: number) => {
      return result;
    }), catchError(err => {
      this.mainService.httpError(err);
      throw new Error(err.error.message);
    }));
  }


  public findProjects(ngo: NgoDTO, page?: number, pageSize?: number, filter?: any) {
    let queryString: string = '';
    if (page && pageSize) {
      queryString += '?page=' + page + '&pageSize=' + pageSize;
    }
    if (filter) {
      queryString += queryString ? '&deimplementat' : '?deimplementat';
    }
    return this.mainService.get(this.rootURL + this.getProjectsURL.replace(':ngoId', ngo.id.toString()) + queryString).pipe(map((result: ProjectDTO[]) => {
      return plainToClass(ProjectDTO, result, {enableCircularCheck: false});
    }), catchError(err => {
      this.mainService.httpError(err);
      throw new Error(err.error.message);
    }));
  }

  public findMyProjects() {
    return this.mainService.get(this.rootURL + this.getMyProjectsURL).pipe(map((result: ProjectDTO[]) => {
      return plainToClass(ProjectDTO, result, {enableCircularCheck: false});
    }), catchError(err => {
      this.mainService.httpError(err);
      throw new Error(err.error.message);
    }));
  }

  public findProjectPositions(project: ProjectDTO) {
    return this.mainService.get(this.rootURL + this.getProjectPositionsURL.replace(':projectId', project.id.toString())).pipe(map((result: ProjectPositionDTO[]) => {
      return plainToClass(ProjectPositionDTO, result, {enableCircularCheck: false});
    }), catchError(err => {
      this.mainService.httpError(err);
      throw new Error(err.error.message);
    }));
  }


  public findProjectMembers(project: ProjectDTO) {
    return this.mainService.get(this.rootURL + this.getProjectMembersURL.replace(':projectId', project.id.toString())).pipe(map((result: ProjectMemberDTO[]) => {
      return plainToClass(ProjectMemberDTO, result, {enableCircularCheck: false});
    }), catchError(err => {
      this.mainService.httpError(err);
      throw new Error(err.error.message);
    }));
  }


  createMember(member: ProjectMemberDTO, project: ProjectDTO) {
    return this.mainService.post(this.rootURL + this.createProjectMembersURL.replace(':projectId', project.id.toString()), member).pipe(map((result: ProjectMemberDTO) => {
      return result;
    }), catchError(err => {
      throw new Error(err.error.message);
    }));
  }

  updateMember(member: ProjectMemberDTO, project: ProjectDTO) {
    return this.mainService.put(this.rootURL + this.createProjectMembersURL.replace(':projectId', project.id.toString()), member).pipe(map((result: ProjectMemberDTO) => {
      return result;
    }), catchError(err => {
      throw new Error(err.error.message);
    }));
  }


  deleteMember(member: ProjectMemberDTO) {
    return this.mainService.delete(this.rootURL + this.deleteProjectMembersURL.replace(':projectMemberId', member.id.toString())).pipe(map((result) => {
      return result;
    }), catchError(err => {
      throw new Error(err.error.message);
    }));
  }

  public updateLogo(profilePicture: any, project: ProjectDTO) {
    return this.mainService.postFile(this.rootURL + this.uploadImageURL.replace(':projectId', project.id.toString()), profilePicture).pipe(map((result: ProjectDTO) => {
      return result;
    }), catchError(err => {
      this.mainService.httpError(err);
      throw new Error(err);
    }));
  }
}
