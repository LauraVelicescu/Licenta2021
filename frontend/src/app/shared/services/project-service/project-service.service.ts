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

@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService {
  private rootURL = 'api'
  private createURL = '/createProject/:ngoId'
  private updateURL = '/updateProject'
  private deleteURL = '/deleteProjects'
  private getProjectsURL = '/findProjects/:ngoId'
  private getProjectsCountURL = '/findProjects/count/:ngoId'

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

  delete(projects: ProjectDTO[]) {
    return this.mainService.post(this.rootURL + this.deleteURL,
      projects).pipe(map((result: string[]) => {
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

}
