import {Injectable} from '@angular/core';
import {NgoDTO} from '../../dto/NgoDTO';
import {MainServiceService} from '../main/main-service.service';
import {catchError, map} from 'rxjs/operators';
import {plainToClass} from 'class-transformer';
import {UserDTO} from '../../dto/UserDTO';
import {MemberDTO} from '../../dto/MemberDTO';
import {MemberRequestDTO, MemberRequestStatus} from '../../dto/MemberRequestDTO';
import {FunctionDTO} from '../../dto/FunctionDTO';
import {ProjectDTO} from '../../dto/ProjectDTO';
import {ProjectPositionDTO} from '../../dto/ProjectPositionDTO';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private rootURL = 'api'
  private createURL = '/createProject/:ngoId'
  private updateURL = '/updateProject'
  private deleteURL = '/:projectId'
  private getProjectsURL = '/findProjects/:ngoId'
  private getProjectsCountURL = '/findProjects/count/:ngoId'
  private getProjectPositionsURL = '/project/:projectId/positions'


  // TODO CHANGE THIS FROM POST TO DELETE
  // TODO REFACTOR ALL THIS SERVICE
  constructor(private mainService: MainServiceService) {
  }

  create(project: ProjectDTO, ngo: NgoDTO) {
    return this.mainService.post(this.rootURL + this.createURL.replace(":ngoId", ngo.id.toString()),
      project).pipe(map((result: ProjectDTO) => {
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
    return this.mainService.delete(this.rootURL + this.deleteURL.replace(":projectId", project.id.toString())).pipe(map((result) => {
      return result;
    }), catchError(err => {
      throw new Error(err.error.message);
    }));
  }

  public findProjectsCount(ngo: NgoDTO) {
    return this.mainService.get(this.rootURL + this.getProjectsCountURL.replace(":ngoId", ngo.id.toString())).pipe(map((result: number) => {
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
    return this.mainService.get(this.rootURL + this.getProjectsURL.replace(":ngoId", ngo.id.toString()) + queryString).pipe(map((result: ProjectDTO[]) => {
      return plainToClass(ProjectDTO, result, {enableCircularCheck: false});
    }), catchError(err => {
      this.mainService.httpError(err);
      throw new Error(err.error.message);
    }));
  }

  public findProjectPositions(project: ProjectDTO) {
    return this.mainService.get(this.rootURL + this.getProjectPositionsURL.replace(":projectId", project.id.toString()) ).pipe(map((result: ProjectPositionDTO[]) => {
      return plainToClass(ProjectPositionDTO, result, {enableCircularCheck: false});
    }), catchError(err => {
      this.mainService.httpError(err);
      throw new Error(err.error.message);
    }));
  }
}
