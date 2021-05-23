import {Injectable} from '@angular/core';
import {MainServiceService} from '../main/main-service.service';
import {SecurityStorage} from '../../../security/SecurityStorage';
import {UserDTO} from '../../dto/UserDTO';
import {catchError, map} from 'rxjs/operators';
import {plainToClass} from 'class-transformer';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private rootURL = 'api/user'
  private updateURL = '/updateUser';
  private getURL = '/getUser';
  private getUsersURL = '/findUsers'
  private getUsersCountURL = '/findUsers/count';
  private deleteURL = '/delete';
  private blockURL = '/block';
  private uploadImageURL = '/uploadImage'

  constructor(private mainService: MainServiceService, private securityStorage: SecurityStorage) {
  }

  public update(userInfo: UserDTO) {
    return this.mainService.post(this.rootURL + this.updateURL,
      userInfo).pipe(map((result: UserDTO) => {
      return result;
    }), catchError(err => {
      this.mainService.httpError(err);
      throw new Error(err.error.message);
    }));
  }

  public getUser() {
    return this.mainService.get(this.rootURL + this.getURL).pipe(map((result: UserDTO) => {
      return result;
    }), catchError(err => {
      this.mainService.httpError(err);
      throw new Error(err);
    }));
  }

  public updateProfilePicture(profilePicture: any) {
    return this.mainService.postFile(this.rootURL + this.uploadImageURL, profilePicture).pipe(map((result: UserDTO) => {
      return result;
    }), catchError(err => {
      this.mainService.httpError(err);
      throw new Error(err);
    }));
  }


  public findUsers(page?: number, pageSize?: number, filter?: any) {
    let queryString: string = '';
    if (page && pageSize) {
      queryString += '?page=' + page + '&pageSize=' + pageSize;
    }
    if (filter) {
      queryString += queryString ? '&deimplementat' : '?deimplementat';
    }
    return this.mainService.get(this.rootURL + this.getUsersURL + queryString).pipe(map((result: UserDTO[]) => {
      return plainToClass(UserDTO, result, {enableCircularCheck: false});
    }), catchError(err => {
      this.mainService.httpError(err);
      throw new Error(err.error.message);
    }));
  }

  public findUsersCount() {
    return this.mainService.get(this.rootURL + this.getUsersCountURL ).pipe(map((result: number) => {
      return result;
    }), catchError(err => {
      this.mainService.httpError(err);
      throw new Error(err.error.message);
    }));
  }

  public deleteUsers(users: UserDTO[]) {
    return this.mainService.post(this.rootURL + this.deleteURL, users).pipe(map((result: string[]) => {
      return result;
    }), catchError(err => {
      this.mainService.httpError(err);
      throw new Error(err.error.message);
    }));
  }

  public blockUsers(users: UserDTO[]) {
    return this.mainService.post(this.rootURL + this.blockURL, users).pipe(map((result: string[]) => {
      return result;
    }), catchError(err => {
      this.mainService.httpError(err);
      throw new Error(err.error.message);
    }));
  }
}